/**
 * @module controllers/ai
 */

import asyncHandler from 'express-async-handler';
import crypto from 'node:crypto';

import ChatConversation from '../models/chatConversation.model.js';
import Report from '../models/report.model.js';
import Transcription from '../models/transcription.model.js';
import { generateText as addisGenerateText } from '../services/addis.service.js';
import { generateGeminiText } from '../services/gemini.service.js';
import { generateNvidiaText } from '../services/nvidia.service.js';
import constants from '../utils/constants.js';
import { CustomError } from '../utils/error.js';
import { BAD_GATEWAY, CONFLICT, CREATED, NOT_FOUND, OK, UNPROCESSABLE_ENTITY } from '../utils/httpStatus.js';
import { buildCorrectionPrompt, buildGenerationPrompt, buildTranscriptionCorrectionPrompt } from '../utils/promptSeeds.js';
import { validateReportOutput } from '../utils/reportValidator.js';
import logger from '../utils/logger.js';

/** @type {string} The Report transcription field populated on generation checks. */
const TRANSCRIPTION_POPULATE = { path: 'transcription', select: 'latest raw' };

/** @type {string[]} Branch fields populated for the generation context. */
const BRANCH_POPULATE = { path: 'branches.branchId', select: 'name location' };

/** @type {string} UUID v4 for conversation message ids (see `## Data Modeling` §4.6). */
const newMessageId = () => crypto.randomUUID();

/** @type {string} The report-correction tool name (Phase 5 corrigenda: report edits must write `Report.generated`, not the transcription — `## AI Prompt Spec` §9 vs §11). */
const REPORT_TOOL_NAME = constants.ASSISTANT_TOOL_SAVE_REPORT;

/** @type {string} The transcription-correction tool name (T-5-04b: approved writing returns the report to `reviewed` so it can be regenerated). */
const TRANSCRIPTION_TOOL_NAME = constants.ASSISTANT_TOOL_SAVE_TRANSCRIPTION;

/**
 * Ordered provider dispatch table: each entry wraps the domain service in a
 * uniform `({ systemPrompt, history, prompt, generationConfig, reasoning }) →
 * { text, requestId, reasoning? }` shape so the fallback chain is
 * provider-agnostic.
 *
 * @type {Object<string, Function>}
 */
const providerDispatchers = Object.freeze({
  [constants.PROVIDER_ADDIS]: (payload) =>
    addisGenerateText(payload.prompt, { history: payload.history, generationConfig: payload.generationConfig }),
  [constants.PROVIDER_GEMINI]: (payload) =>
    generateGeminiText(payload, { generationConfig: payload.generationConfig }),
  [constants.PROVIDER_NVIDIA]: (payload) =>
    generateNvidiaText(payload, { generationConfig: payload.generationConfig }),
});

/**
 * Runs the generation fallback chain Addis → Gemini → Nvidia (REQ-134)
 * starting at a requested provider. Behavior depends on the selection:
 *
 * - **Default flow** (no explicit provider, or the default `addis`): the
 *   resilient chain runs — each provider failure (unmapped status or an
 *   output failing the 16-rule validation, S-5-07b) advances to the next;
 *   exhaustion throws the last error (REQ-136/137).
 * - **Explicit selection** (any non-default provider): the chosen provider is
 *   tried alone and a failure is surfaced loudly with its mapped reason — the
 *   chain must NOT silently fall back to Addis and mask the selection (user
 *   follow-up: "provider selection doesn't work"). `SERVICE_UNAVAILABLE` is
 *   thrown with the mapped message so the UI can tell the user exactly which
 *   provider failed and why.
 *
 * @param {Object} payload - The generation payload.
 * @param {string} payload.systemPrompt - The system prompt (`## AI Prompt Spec` §9).
 * @param {string} payload.prompt - The assembled directive text.
 * @param {Array<{role: string, content: string}>} payload.history - Conversation turns.
 * @param {string} payload.contextTranscription - The reviewed transcription text (for validation).
 * @param {import('mongoose').Document} payload.report - The report (for validation context).
 * @param {string} [payload.requestedProvider] - The user-selected provider; falls through to the chain when absent or default.
 * @param {Object} [payload.generationConfig] - The frozen generation config (generation or correction group).
 * @param {boolean} [payload.validateOutput] - True to run the 16-rule output validation (generation only).
 * @param {boolean} [payload.reasoning] - True to request reasoning output from reasoning-capable providers.
 * @returns {Promise<{ text: string, provider: string, reasoning?: string }>} The validated output, the provider that produced it, and optional reasoning text.
 * @throws {CustomError} BAD_GATEWAY when the chain is exhausted or an explicit provider fails (F-5-01 — always a CustomError so the error middleware answers the unified 502 envelope, never a leaked provider object → 500).
 */
async function generateWithFallback({
  systemPrompt,
  prompt,
  history = [],
  contextTranscription = '',
  report,
  requestedProvider = constants.AI_DEFAULT_PROVIDER,
  generationConfig,
  validateOutput = true,
  reasoning = false,
}) {
  const isExplicitSelection =
    requestedProvider !== constants.AI_DEFAULT_PROVIDER && constants.AI_PROVIDER_FALLBACK_ORDER.includes(requestedProvider);
  const candidates = isExplicitSelection
    ? [requestedProvider]
    : constants.AI_PROVIDER_FALLBACK_ORDER.slice(
        Math.max(0, constants.AI_PROVIDER_FALLBACK_ORDER.indexOf(requestedProvider)),
      );
  let lastError = null;
  for (const provider of candidates) {
    try {
      const { text, reasoning: reasoningText } = await providerDispatchers[provider]({
        systemPrompt,
        history,
        prompt,
        generationConfig,
        reasoning,
      });
      if (validateOutput) {
        const check = validateReportOutput(text, { report, transcription: contextTranscription });
        if (!check.valid) {
          lastError = new CustomError(BAD_GATEWAY, `Generated report failed validation (${check.violations.join('; ')})`);
          continue;
        }
      }
      return { text, provider, reasoning: reasoningText };
    } catch (error) {
      lastError = error instanceof CustomError ? error : new CustomError(BAD_GATEWAY, error?.message || 'AI provider failed');
      if (isExplicitSelection) {
        // The provider's own status must NOT leak through as a 4xx (a 401
        // would trip the client's refresh machinery for the wrong reason) —
        // always surface an explicit selection failure as a clean 502 with
        // its mapped reason.
        const safeMessage = error?.message || 'The selected AI provider could not process the request';
        logger.warn('Explicit AI provider failed', { provider: requestedProvider, message: safeMessage });
        throw new CustomError(BAD_GATEWAY, `The selected provider (${requestedProvider}) failed: ${safeMessage}`);
      }
    }
  }
  throw lastError ?? new CustomError(BAD_GATEWAY, 'No AI provider could generate the report');
}

/**
 * Generates the daily report (`POST /api/v1/reports/:reportId/generate`,
 * T-5-02, `## API Contract` §5): generation is allowed only from the
 * `reviewed` status (T-5-05a; `## Status Machine` §2/§3 — never from raw
 * audio, BR-05); the reviewed transcription is the raw material (PR-04).
 * On success a ChatConversation for the report is created/found, the
 * generated text is stored on `Report.generated` (AD-010) with the previous
 * text pushed to `generatedHistory[]`, the provider is recorded on the
 * conversation message (REQ-133), and the report advances to `completed`.
 * A failing provider or invalid output triggers the fallback chain
 * (REQ-134); exhaustion returns 502 (REQ-136/137).
 *
 * @param {import('express').Request} req - The request; `req.params.id` is the report id; `req.validated.body.provider` selects the start provider.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const generateReport = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ _id: req.params.id, user: req.user._id })
    .populate(TRANSCRIPTION_POPULATE)
    .populate(BRANCH_POPULATE);
  if (!report) {
    throw new CustomError(NOT_FOUND, 'Report not found');
  }
  if (report.status !== constants.REPORT_STATUS_REVIEWED) {
    throw new CustomError(CONFLICT, 'Report generation requires a reviewed transcription');
  }
  const transcription = report.transcription ?? null;
  if ((transcription?.latest ?? '').trim() === '') {
    throw new CustomError(CONFLICT, 'Report transcription has no reviewed text to generate from');
  }
  const requestedProvider = req.validated?.body?.provider ?? constants.AI_DEFAULT_PROVIDER;
  const reasoning = req.validated?.body?.reasoning ?? false;
  const context = {
    report,
    transcriptionText: transcription.latest,
  };
  const prompt = buildGenerationPrompt(context);
  const { text, provider } = await generateWithFallback({
    systemPrompt: constants.AI_SYSTEM_PROMPT_GENERATION,
    prompt,
    history: [],
    contextTranscription: transcription.latest,
    report,
    requestedProvider,
    reasoning,
    generationConfig: {
      temperature: constants.AI_TEMPERATURE,
      maxOutputTokens: constants.AI_MAX_OUTPUT_TOKENS,
      topP: constants.AI_TOP_P,
      topK: constants.AI_TOP_K,
    },
  });
  let conversation = await ChatConversation.findOne({ user: req.user._id, report: report._id });
  if (!conversation) {
    conversation = await ChatConversation.create({
      user: req.user._id,
      report: report._id,
      title: `Report ${report.date}`,
      messages: [],
    });
  }
  conversation.messages.push({
    id: newMessageId(),
    role: 'assistant',
    status: 'complete',
    parts: [{ type: 'text', text }],
    provider,
  });
  if (report.generated) {
    report.generatedHistory.push({ provider, text: report.generated });
  }
  report.generated = text;
  report.status = constants.REPORT_STATUS_COMPLETED;
  await conversation.save();
  await report.save();
  res.status(OK).json({
    success: true,
    message: 'Report generated',
    data: { report, provider, conversationId: conversation._id.toString() },
  });
});

/** @type {string} The Report transcription field populated on assistant reads. */
const ASSISTANT_TRANSCRIPTION_POPULATE = { path: 'transcription', select: 'latest raw' };

/** @type {string[]} Branch fields populated for the assistant context. */
const ASSISTANT_BRANCH_POPULATE = { path: 'branches.branchId', select: 'name location' };

/**
 * Loads a conversation owned by the authenticated user, or throws 404.
 *
 * @param {import('express').Request} req - The request.
 * @param {string} conversationId - The conversation id.
 * @returns {Promise<import('mongoose').Document>} The conversation.
 */
async function findOwnedConversation(req, conversationId) {
  const conversation = await ChatConversation.findOne({ _id: conversationId, user: req.user._id });
  if (!conversation) {
    throw new CustomError(NOT_FOUND, 'Conversation not found');
  }
  return conversation;
}

/**
 * Builds the welcome assistant message for a conversation: injects the raw
 * transcription text plus the report metadata (`docs/initial-doc.md`
 * §3.5.2 — "New Chat" report-picker flow).
 *
 * @param {import('mongoose').Document} report - The linked report.
 * @returns {{ id: string, role: string, status: string, parts: Array<{type: string, text: string}> }} The welcome message.
 */
function buildWelcomeMessage(report) {
  const lines = [`Report ${report.date} — ${report.branches?.map((visit) => visit.branchId?.name ?? '').filter(Boolean).join(', ') || 'No branches'}`];
  const transcriptionText = report.transcription?.raw?.trim() || report.transcription?.latest?.trim() || '';
  if (transcriptionText) {
    lines.push('', 'Transcription:', transcriptionText);
  } else {
    lines.push('', 'No transcription is available yet for this report.');
  }
  return {
    id: newMessageId(),
    role: 'assistant',
    status: 'complete',
    parts: [{ type: 'text', text: lines.join('\n') }],
  };
}

/**
 * Builds the opening assistant message for a free conversation (no report
 * bound): a short greeting so the rail preview has content.
 *
 * @returns {{ id: string, role: string, status: string, parts: Array<{type: string, text: string}> }} The welcome message.
 */
function buildFreeChatWelcomeMessage() {
  return {
    id: newMessageId(),
    role: 'assistant',
    status: 'complete',
    parts: [{ type: 'text', text: "Hello! I'm your Report Builder assistant. This is a free conversation — ask me anything." }],
  };
}

/**
 * Lists the authenticated user's conversations, newest first
 * (`GET /api/v1/assistant/conversations`).
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const listConversations = asyncHandler(async (req, res) => {
  const conversations = await ChatConversation.find({ user: req.user._id })
    .sort({ updatedAt: -1 })
    .lean();
  const data = conversations.map((conversation) => ({
    _id: conversation._id.toString(),
    reportId: conversation.report ? conversation.report.toString() : null,
    title: conversation.title,
    lastMessageAt: conversation.messages[conversation.messages.length - 1]?.createdAt ?? conversation.updatedAt,
    createdAt: conversation.createdAt,
  }));
  res.status(OK).json({ success: true, message: 'Conversations retrieved', data: { conversations: data } });
});

/**
 * Creates a conversation — find-or-create for report-bound chats (one
 * conversation per report, user decision) or a brand-new free chat when no
 * `reportId` is sent (report-less conversation follow-up): a report-bound
 * conversation is returned with its history (welcome replay included) when it
 * already exists, otherwise it is created with the welcome assistant message
 * carrying the raw transcription + report metadata; a free chat is always
 * created with the generic welcome message.
 *
 * @param {import('express').Request} req - The request; `req.validated.body.reportId` (optional).
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const createConversation = asyncHandler(async (req, res) => {
  const { reportId } = req.validated.body;
  if (!reportId) {
    const conversation = await ChatConversation.create({
      user: req.user._id,
      report: null,
      title: 'New Chat',
      messages: [buildFreeChatWelcomeMessage()],
    });
    return res.status(CREATED).json({ success: true, message: 'Conversation created', data: { conversation, created: true } });
  }
  const report = await Report.findOne({ _id: reportId, user: req.user._id })
    .populate(ASSISTANT_TRANSCRIPTION_POPULATE)
    .populate(ASSISTANT_BRANCH_POPULATE);
  if (!report) {
    throw new CustomError(NOT_FOUND, 'Report not found');
  }
  const existing = await ChatConversation.findOne({ user: req.user._id, report: reportId });
  if (existing) {
    return res.status(OK).json({ success: true, message: 'Conversation found', data: { conversation: existing, created: false } });
  }
  const conversation = await ChatConversation.create({
    user: req.user._id,
    report: report._id,
    title: `Report ${report.date}`,
    messages: [buildWelcomeMessage(report)],
  });
  res.status(CREATED).json({ success: true, message: 'Conversation created', data: { conversation, created: true } });
});

/**
 * Returns the full message history of one conversation
 * (`GET /api/v1/assistant/conversations/:id/messages`).
 *
 * @param {import('express').Request} req - The request; `req.params.id` is the conversation id.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const listMessages = asyncHandler(async (req, res) => {
  const conversation = await findOwnedConversation(req, req.params.id);
  res.status(OK).json({ success: true, message: 'Messages retrieved', data: { messages: conversation.messages } });
});

/**
 * Deletes one of the authenticated user's conversations
 * (`DELETE /api/v1/assistant/conversations/:id`).
 *
 * @param {import('express').Request} req - The request; `req.params.id` is the conversation id.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const deleteConversation = asyncHandler(async (req, res) => {
  const conversation = await findOwnedConversation(req, req.params.id);
  await conversation.deleteOne();
  res.status(OK).json({ success: true, message: 'Conversation deleted', data: { conversationId: req.params.id } });
});

/**
 * In-memory pending tool-call registry, keyed by `toolCallId`
 * (`docs/initial-doc.md` §3.5.2): entries are removed after the SSE stream
 * finishes or after `TOOL_APPROVAL_TIMEOUT_MS` (60 s) without a decision —
 * the approval UI shows "expired" on timeout.
 *
 * @type {Map<string, Object>}
 */
const pendingToolCalls = new Map();

/**
 * Writes an SSE `event`/`data` frame to the response and flushes it
 * immediately — no buffering, no aggregation (streaming discipline,
 * `docs/initial-doc.md` §3.5.2).
 *
 * @param {import('express').Response} res - The SSE response.
 * @param {string} event - The SSE event name (`part` | `finish`).
 * @param {Object} data - The event payload.
 * @returns {void}
 */
function writeSseEvent(res, event, data) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
  if (typeof res.flush === 'function') {
    res.flush();
  }
}

/**
 * Ends an SSE stream, clears the pending-map entry, and returns.
 *
 * @param {import('express').Response} res - The SSE response.
 * @param {string} toolCallId - The pending entry key, when present.
 * @returns {void}
 */
function endSseStream(res, toolCallId = '', messageId = '') {
  if (toolCallId && pendingToolCalls.has(toolCallId)) {
    pendingToolCalls.delete(toolCallId);
  }
  writeSseEvent(res, 'finish', { messageId: messageId || undefined });
  res.end();
}

/**
 * Streams the assistant reply for a conversation whose tail already ends on
 * the anchoring user message. Shared by `sendMessage` (after persisting the
 * new user message) and `regenerateMessage` (after truncating the prior
 * reply), so a fresh send, a regeneration of a free-chat reply, and a
 * report-correction regeneration emit the exact same SSE event sequence
 * (`start` → `reasoning?`/text parts, or `reasoning?`/`tool-input-available`
 * + `tool-approval-request` held in the pending map).
 *
 * @param {Object} options - The stream options.
 * @param {import('mongoose').Document} options.conversation - The conversation (tail = anchoring user message).
 * @param {import('express').Response} options.res - The SSE response.
 * @param {string} options.requestedProvider - The user-selected provider (`addis` | `gemini` | `nvidia`).
 * @param {boolean} options.reasoningEnabled - True to request reasoning output.
 * @param {string|undefined} options.requestedTool - The desired correction tool for report-bound chats (`save_transcription` to correct the transcription — T-5-04b regeneration lane; anything else falls back to `save_report`).
 * @returns {Promise<void>}
 */
async function streamAssistantGeneration({ conversation, res, requestedProvider, reasoningEnabled, requestedTool }) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const history = conversation.messages
    .filter((message) => message.parts?.[0]?.type === 'text')
    .map((message) => ({ role: message.role, content: message.parts[0].text }));
  const isFreeChat = !conversation.report;
  const generationConfig = {
    temperature: constants.AI_CORRECTION_TEMPERATURE,
    maxOutputTokens: constants.AI_CORRECTION_MAX_OUTPUT_TOKENS,
    topP: constants.AI_TOP_P,
    topK: constants.AI_TOP_K,
  };
  let run;
  if (isFreeChat) {
    try {
      run = await generateWithFallback({
        systemPrompt: constants.AI_SYSTEM_PROMPT_ASSISTANT,
        prompt: constants.AI_ASSISTANT_FREE_CHAT_TURN,
        history,
        report: null,
        requestedProvider,
        reasoning: reasoningEnabled,
        generationConfig,
        validateOutput: false,
      });
    } catch (error) {
      const message = error?.message || 'The AI provider could not process the message';
      writeSseEvent(res, 'part', { type: 'text', text: message });
      return endSseStream(res);
    }
    const { text, provider, reasoning: reasoningText } = run;
    const messageId = newMessageId();
    writeSseEvent(res, 'start', { messageId });
    const parts = [{ type: 'text', text }];
    if (reasoningText) {
      parts.unshift({ type: 'reasoning', text: reasoningText });
      writeSseEvent(res, 'part', { type: 'reasoning', text: reasoningText });
    }
    conversation.messages.push({
      id: messageId,
      role: 'assistant',
      status: 'complete',
      parts,
      provider,
    });
    await conversation.save();
    writeSseEvent(res, 'part', { type: 'text', text });
    return endSseStream(res, '', messageId);
  }

  const report = await Report.findById(conversation.report)
    .populate(ASSISTANT_TRANSCRIPTION_POPULATE)
    .populate(ASSISTANT_BRANCH_POPULATE);
  if (!report) {
    throw new CustomError(NOT_FOUND, 'Report not found');
  }
  const transcription = report.transcription ?? null;
  // Tool selection (F-5-02, Option B): the requested tool drives which write
  // the approved correction performs. `save_transcription` is the T-5-04b
  // regeneration lane — the corrected transcription returns the report to
  // `reviewed` so it can be regenerated; `save_report` stays the final
  // report-correction (approved text lands on `Report.generated`, stays
  // `completed`).
  const useTranscriptionTool =
    requestedTool === TRANSCRIPTION_TOOL_NAME &&
    transcription &&
    (transcription.latest || transcription.raw);
  const toolName = useTranscriptionTool ? TRANSCRIPTION_TOOL_NAME : REPORT_TOOL_NAME;
  const prompt = useTranscriptionTool
    ? buildTranscriptionCorrectionPrompt({
        transcriptionText: transcription.latest || transcription.raw || '',
      })
    : buildCorrectionPrompt({
        report,
        transcriptionText: transcription?.latest || transcription?.raw || '',
      });
  try {
    run = await generateWithFallback({
      systemPrompt: useTranscriptionTool
        ? constants.AI_SYSTEM_PROMPT_TRANSCRIPTION_CORRECTION
        : constants.AI_SYSTEM_PROMPT_CORRECTION,
      prompt,
      history,
      contextTranscription: transcription?.latest || '',
      report,
      requestedProvider,
      reasoning: reasoningEnabled,
      generationConfig,
      validateOutput: false,
    });
  } catch (error) {
    const message = error?.message || 'The AI provider could not process the message';
    writeSseEvent(res, 'part', { type: 'text', text: message });
    return endSseStream(res);
  }
  const { text, provider, reasoning: reasoningText } = run;
  const messageId = newMessageId();
  // The persisted assistant message (written in `approveToolCall`) carries
  // this id, so the live client learns the server id via `start` and can
  // regenerate/delete the reply without a reload.
  writeSseEvent(res, 'start', { messageId });
  if (reasoningText) {
    writeSseEvent(res, 'part', { type: 'reasoning', text: reasoningText });
  }
  const toolCallId = newMessageId();
  const toolInput = useTranscriptionTool
    ? { transcriptionId: transcription._id.toString(), latest: text }
    : { reportId: report._id.toString(), correctedText: text };
  writeSseEvent(res, 'part', {
    type: 'tool-input-available',
    toolCallId,
    toolName,
    input: toolInput,
  });
  writeSseEvent(res, 'part', {
    type: 'tool-approval-request',
    toolCallId,
    toolName,
    input: useTranscriptionTool ? { latest: text } : { correctedText: text },
  });
  const expiry = setTimeout(() => {
    if (!pendingToolCalls.has(toolCallId)) return;
    pendingToolCalls.delete(toolCallId);
    writeSseEvent(res, 'part', { type: 'text', text: 'The approval request expired after 60 seconds.' });
    endSseStream(res);
  }, constants.TOOL_APPROVAL_TIMEOUT_MS);
  const keepalive = setInterval(() => {
    res.write(': ping\n\n');
    if (typeof res.flush === 'function') {
      res.flush();
    }
  }, constants.SSE_KEEPALIVE_INTERVAL_MS);
  pendingToolCalls.set(toolCallId, {
    res,
    conversationId: conversation._id.toString(),
    reportId: report._id.toString(),
    toolCallId,
    toolName,
    toolInput,
    provider,
    messageId,
    reasoningText,
    expiry,
    keepalive,
  });
  res.on('close', () => {
    clearTimeout(expiry);
    clearInterval(keepalive);
    pendingToolCalls.delete(toolCallId);
  });
}

/**
 * Sends a user message to a conversation (`POST
 * /api/v1/assistant/conversations/:id/messages`, SSE response). The user
 * message is persisted, then the provider run starts with the correction
 * system prompt (REQ-147) and the frozen AI Correction config (REQ-127).
 * Report-bound chats offer the requested correction tool — `save_report`
 * (F-5-02 default) or `save_transcription` when the user asked to redo the
 * transcription (T-5-04b regeneration lane); the server emits `start` then
 * `tool-input-available` and `tool-approval-request` and holds the run in the
 * pending map until the user decides (60 s timeout). Free chats stream the
 * plain reply.
 *
 * @param {import('express').Request} req - The request; `req.params.id` is the conversation id; `req.validated.body.content` is the correction instruction; `req.validated.body.tool` selects the correction tool (`save_report` | `save_transcription`, default `save_report`).
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const conversation = await findOwnedConversation(req, req.params.id);
  const { content } = req.validated.body;
  conversation.messages.push({
    id: newMessageId(),
    role: 'user',
    status: 'complete',
    parts: [{ type: 'text', text: content }],
  });
  await conversation.save();

  const requestedProvider = req.validated.body.provider ?? constants.AI_DEFAULT_PROVIDER;
  const reasoningEnabled = req.validated.body.reasoning ?? false;
  const requestedTool = req.validated.body.tool ?? REPORT_TOOL_NAME;
  await streamAssistantGeneration({ conversation, res, requestedProvider, reasoningEnabled, requestedTool });
});

/**
 * Deletes a message from a conversation (`DELETE
 * /api/v1/assistant/conversations/:id/messages/:messageId`). Deleting a user
 * message drops everything after it (its reply and the tail, so the thread
 * stays contiguous); deleting an assistant message drops it and the tail.
 *
 * @param {import('express').Request} req - The request; `req.params.id`/`req.params.messageId`.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const deleteMessage = asyncHandler(async (req, res) => {
  const conversation = await findOwnedConversation(req, req.params.id);
  const { messageId } = req.params;
  const index = conversation.messages.findIndex((message) => message.id === messageId);
  if (index === -1) {
    throw new CustomError(NOT_FOUND, 'Message not found');
  }
  const keepAnchor = conversation.messages[index].role === 'user';
  conversation.messages = conversation.messages.slice(0, index + (keepAnchor ? 1 : 0));
  await conversation.save();
  res.status(OK).json({ success: true, message: 'Message deleted', data: {} });
});

/**
 * Regenerates an assistant reply (`POST
 * /api/v1/assistant/conversations/:id/messages/:messageId/regenerate`, SSE).
 * The anchored user message (the target reply, or its preceding user message
 * when given the reply id) stays in place and everything after it is
 * truncated, then a fresh reply streams through `streamAssistantGeneration`
 * with the identical event contract as a fresh send.
 *
 * @param {import('express').Request} req - The request; `req.params.id`/`req.params.messageId`; `req.validated.body.provider`/`reasoning`.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const regenerateMessage = asyncHandler(async (req, res) => {
  const conversation = await findOwnedConversation(req, req.params.id);
  const targetIndex = conversation.messages.findIndex((message) => message.id === req.params.messageId);
  if (targetIndex === -1) {
    throw new CustomError(NOT_FOUND, 'Message not found');
  }
  const target = conversation.messages[targetIndex];
  let anchorIndex = targetIndex;
  if (target.role !== 'user') {
    for (let index = targetIndex - 1; index >= 0; index -= 1) {
      if (conversation.messages[index].role === 'user') {
        anchorIndex = index;
        break;
      }
    }
  }
  if (anchorIndex === -1) {
    throw new CustomError(UNPROCESSABLE_ENTITY, 'Cannot regenerate from this message');
  }
  conversation.messages = conversation.messages.slice(0, anchorIndex + 1);
  await conversation.save();

  const requestedProvider = req.validated.body.provider ?? constants.AI_DEFAULT_PROVIDER;
  const reasoningEnabled = req.validated.body.reasoning ?? false;
  const requestedTool = req.validated.body.tool ?? REPORT_TOOL_NAME;
  await streamAssistantGeneration({ conversation, res, requestedProvider, reasoningEnabled, requestedTool });
});

/**
 * Resolves a pending tool call (`POST /api/v1/assistant/tools/:toolCallId/approval`).
 * Two tools are supported:
 *
 * - `save_report` (Phase 5 corrigenda): the approved corrected text overwrites
 *   `Report.generated`, the previous text is pushed to `generatedHistory[]`
 *   (AD-010), and the report stays `completed` — the edit is immediately
 *   visible in the report without a regeneration round-trip.
 * - `save_transcription` (T-5-04b): `Transcription.latest` is overwritten, a
 *   `history[]` entry is pushed with `reviewer` = the provider string
 *   (`## Data Modeling` §4.3; REQ-149), and the report returns to `reviewed`
 *   so it can be regenerated.
 *
 * The SSE stream continues with `tool-output-available` then `finish`. On
 * rejection the provider is told the user rejected the change and the
 * stream finishes without writing.
 *
 * @param {import('express').Request} req - The request; `req.params.toolCallId`; `req.validated.body.approved`, `req.validated.body.reason`.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const approveToolCall = asyncHandler(async (req, res) => {
  const pending = pendingToolCalls.get(req.params.toolCallId);
  if (!pending) {
    throw new CustomError(NOT_FOUND, 'No pending tool call with that id (it may have expired)');
  }
  const { approved, reason } = req.validated.body;
  const { res: sseRes, toolCallId, toolInput, provider, expiry, keepalive } = pending;
  clearTimeout(expiry);
  clearInterval(keepalive);
  pendingToolCalls.delete(toolCallId);

  const conversation = await ChatConversation.findOne({ _id: pending.conversationId, user: req.user._id });
  if (!conversation) {
    throw new CustomError(NOT_FOUND, 'Conversation not found');
  }
  const replyId = pending.messageId ?? newMessageId();
  const reasoningPart = pending.reasoningText ? [{ type: 'reasoning', text: pending.reasoningText }] : [];
  if (!approved) {
    conversation.messages.push({
      id: replyId,
      role: 'assistant',
      status: 'complete',
      parts: [
        ...reasoningPart,
        { type: 'tool-input-available', toolCallId, toolName: pending.toolName, input: toolInput },
        {
          type: 'tool-approval-request',
          toolCallId,
          toolName: pending.toolName,
          input: toolInput.correctedText ? { correctedText: toolInput.correctedText } : { latest: toolInput.latest },
        },
        {
          type: 'text',
          text: `You rejected the change${reason ? `: ${reason}` : ''}. Nothing was updated.`,
        },
      ],
      provider,
    });
    await conversation.save();
    writeSseEvent(sseRes, 'part', {
      type: 'text',
      text: `The user rejected the change${reason ? `: ${reason}` : ''}. Nothing was updated.`,
    });
    endSseStream(sseRes, toolCallId, replyId);
    res.status(OK).json({ success: true, message: 'Tool call resolved', data: { approved } });
    return;
  }

  const report = await Report.findOne({ _id: pending.reportId, user: req.user._id });
  if (!report) {
    throw new CustomError(NOT_FOUND, 'Report not found');
  }
  let outputMessage;
  if (pending.toolName === REPORT_TOOL_NAME) {
    if (report.generated) {
      report.generatedHistory.push({ provider, text: report.generated });
    }
    report.generated = toolInput.correctedText;
    report.status = constants.REPORT_STATUS_COMPLETED;
    outputMessage = 'Report updated with your approved correction.';
  } else {
    const transcription = await Transcription.findById(toolInput.transcriptionId);
    if (!transcription) {
      throw new CustomError(NOT_FOUND, 'Transcription not found');
    }
    transcription.history.push({ instruction: reason ?? '', reviewed: toolInput.latest, reviewer: provider });
    transcription.latest = toolInput.latest;
    await transcription.save();
    if (report.status !== constants.REPORT_STATUS_REVIEWED) {
      report.status = constants.REPORT_STATUS_REVIEWED;
    }
    outputMessage = 'Transcription updated with your approved correction.';
  }
  await report.save();
  conversation.messages.push({
    id: replyId,
    role: 'assistant',
    status: 'complete',
    parts: [
      ...reasoningPart,
      { type: 'tool-input-available', toolCallId, toolName: pending.toolName, input: toolInput },
      {
        type: 'tool-approval-request',
        toolCallId,
        toolName: pending.toolName,
        input: toolInput.correctedText ? { correctedText: toolInput.correctedText } : { latest: toolInput.latest },
      },
      { type: 'tool-output-available', toolCallId, output: { message: outputMessage } },
      { type: 'text', text: outputMessage },
    ],
    provider,
  });
  await conversation.save();
  writeSseEvent(sseRes, 'part', {
    type: 'tool-output-available',
    toolCallId,
    output: { message: outputMessage },
  });
  endSseStream(sseRes, toolCallId, replyId);
  res.status(OK).json({ success: true, message: 'Tool call resolved', data: { approved } });
});