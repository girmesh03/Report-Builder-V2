/**
 * @module components/assistant/chatAdapter
 */

import { fetchWithReauth } from '../../utils/fetchWithReauth.js';

/** @type {string} The assistant API base path (mounted under `/api/v1`). */
const ASSISTANT_BASE = '/assistant';

/**
 * Rehydrates the persisted tool parts of a message (backend part types
 * `tool-input-available` / `tool-approval-request` / `tool-output-available`)
 * into a single Chat `tool` part. A persisted approval is always resolved —
 * an `output-available` record means the tool ran (approval granted), its
 * absence means the user declined (approval responded with `false`); either
 * way the card renders read-only, never a fresh approve/decline prompt.
 *
 * @param {Object[]} parts - The backend message parts.
 * @returns {Object[]} The Chat parts.
 */
function rehydrateToolParts(parts) {
  const inputPart = parts.find((part) => part.type === 'tool-input-available');
  const outputPart = parts.find((part) => part.type === 'tool-output-available');
  const approvalPart = parts.find((part) => part.type === 'tool-approval-request');
  if (!inputPart) {
    return [];
  }
  const toolCallId = inputPart.toolCallId ?? approvalPart?.toolCallId ?? '';
  const toolName = inputPart.toolName ?? approvalPart?.toolName ?? '';
  return [
    {
      type: 'tool',
      toolInvocation: {
        toolCallId,
        toolName,
        state: outputPart ? 'output-available' : 'approval-responded',
        input: inputPart.input,
        output: outputPart?.output,
        approval: { approved: Boolean(outputPart) },
        approvalId: toolCallId,
      },
    },
  ];
}

/**
 * Maps a backend message record to a Chat provider `ChatMessage` (`docs/initial-doc.md`
 * §3.5.2 Response Shapes). Historical messages render as a plain transcript:
 * `text` and `reasoning` parts are kept and resolved tool parts are
 * rehydrated as read-only tool cards (see `rehydrateToolParts`).
 *
 * @param {Object} message - The backend message record.
 * @param {Object | null} currentUser - The logged-in user (for author attribution).
 * @returns {Object} The ChatMessage entity.
 */
function mapBackendMessage(message, currentUser) {
  const role = message.role === 'assistant' ? 'assistant' : 'user';
  const author =
    role === 'assistant'
      ? { id: 'assistant', displayName: 'Assistant', role: 'assistant' }
      : currentUser
        ? { id: currentUser._id ?? currentUser.id, displayName: currentUser.fullName ?? currentUser.displayName, role: 'user' }
        : { id: 'user', displayName: 'You', role: 'user' };
  const textParts = (message.parts ?? [])
    .filter((part) => part.type === 'text' || part.type === 'reasoning')
    .map((part) => ({ type: part.type, text: part.text }));
  return {
    id: message.id,
    role,
    parts: [...rehydrateToolParts(message.parts ?? []), ...textParts],
    status: message.status === 'complete' ? 'sent' : message.status || 'sent',
    createdAt: message.createdAt ?? new Date().toISOString(),
    author,
  };
}

/**
 * Converts a backend SSE `part` payload into one or more Chat stream chunks.
 * Text parts are expanded to `text-start`/`text-delta`/`text-end` (each part
 * gets its own stream id so the runtime allocates a fresh text part per
 * server part); tool parts pass through — their field names already match the
 * chunk contract (`toolCallId`, `toolName`, `input`, `output`, `approvalId`).
 *
 * @param {Object} part - The `part` event payload.
 * @param {number} textSeq - The next text stream id sequence number.
 * @returns {{ chunks: Object[], textSeq: number }} The converted chunks and the next sequence.
 */
function mapPartToChunks(part, textSeq) {
  if (part.type === 'text') {
    const id = `text-${textSeq}`;
    return {
      chunks: [
        { type: 'text-start', id },
        { type: 'text-delta', id, delta: part.text },
        { type: 'text-end', id },
      ],
      textSeq: textSeq + 1,
    };
  }
  if (part.type === 'reasoning') {
    const id = `reasoning-${textSeq}`;
    return {
      chunks: [
        { type: 'reasoning-start', id },
        { type: 'reasoning-delta', id, delta: part.text },
        { type: 'reasoning-end', id },
      ],
      textSeq: textSeq + 1,
    };
  }
  return { chunks: [{ ...part }], textSeq };
}

/**
 * Safely parses the `data:` payload lines of an SSE frame into an object.
 *
 * @param {string[]} dataLines - The collected `data:` payload lines.
 * @returns {Object} The parsed payload, or an empty object for malformed JSON.
 */
function parseSseData(dataLines) {
  try {
    return JSON.parse(dataLines.join('\n'));
  } catch {
    return {};
  }
}

/**
 * Parses one SSE dispatch frame (a `\n\n`-delimited block) into stream chunks.
 * Comment frames (heartbeat `: ping`) and frames without a known event are
 * ignored; `finish` becomes the terminal `finish` chunk.
 *
 * @param {string} frame - The raw frame text (without the trailing blank line).
 * @param {number} textSeq - The next text stream id sequence number.
 * @returns {{ chunks: Object[], textSeq: number }} The converted chunks and the next sequence.
 */
function parseSseFrame(frame, textSeq) {
  let event = 'part';
  const dataLines = [];
  for (const line of frame.split('\n')) {
    const clean = line.replace(/\r$/, '');
    if (clean.startsWith('event:')) {
      event = clean.slice(6).trim();
    } else if (clean.startsWith('data:')) {
      dataLines.push(clean.slice(5).trimStart());
    }
  }
  if (event === 'start') {
    const data = parseSseData(dataLines);
    return { chunks: [{ type: 'start', messageId: data.messageId }], textSeq };
  }
  if (event === 'finish') {
    const data = parseSseData(dataLines);
    const chunk = { type: 'finish' };
    if (data.messageId) {
      chunk.messageId = data.messageId;
    }
    return { chunks: [chunk], textSeq };
  }
  if (event !== 'part' || dataLines.length === 0) {
    return { chunks: [], textSeq };
  }
  let part;
  try {
    part = JSON.parse(dataLines.join('\n'));
  } catch {
    return { chunks: [], textSeq };
  }
  return mapPartToChunks(part, textSeq);
}

/**
 * Creates a `TransformStream` that converts a raw SSE byte stream (from
 * `fetch(...).body`) into a stream of Chat message chunks for the Chat
 * provider (`processStream`). Frames are reassembled across network chunks
 * (streaming-safe `TextDecoder`); `event: part`/`event: finish` payloads are
 * mapped through `parseSseFrame`/`mapPartToChunks`.
 *
 * @returns {TransformStream<Uint8Array, Object>} The SSE → chunk transform.
 */
function createSseToChunkTransform() {
  let buffer = '';
  let textSeq = 0;
  const decoder = new TextDecoder();
  return new TransformStream({
    transform(raw, controller) {
      buffer += decoder.decode(raw, { stream: true });
      let boundary;
      while ((boundary = buffer.indexOf('\n\n')) !== -1) {
        const frame = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const { chunks, textSeq: nextSeq } = parseSseFrame(frame, textSeq);
        textSeq = nextSeq;
        for (const chunk of chunks) {
          controller.enqueue(chunk);
        }
      }
    },
    flush(controller) {
      buffer += decoder.decode();
      const { chunks, textSeq: nextSeq } = parseSseFrame(buffer, textSeq);
      for (const chunk of chunks) {
        controller.enqueue(chunk);
      }
      void nextSeq;
    },
  });
}

/**
 * Reads a JSON error envelope from a failed response and throws an `Error`
 * with the server message (the Chat runtime surfaces it in the error card).
 *
 * @param {Response} response - The failed fetch response.
 * @param {string} fallback - Fallback message when the body is not JSON.
 * @returns {Promise<never>} Always throws.
 */
async function throwFromResponse(response, fallback) {
  let message = fallback;
  try {
    const body = await response.json();
    message = body?.message || fallback;
  } catch {
    // Non-JSON body (e.g. gateway error page) — keep the fallback message.
  }
  throw new Error(message);
}

/**
 * Builds the `@mui/x-chat` adapter for the report assistant
 * (`docs/initial-doc.md` §3.5.2). The adapter is a plain object whose methods
 * mirror the Chat provider contract: `sendMessage` returns the SSE response
 * body transformed into Chat chunks, `listMessages` returns the persisted
 * history, `addToolApprovalResponse` resolves a pending correction tool call
 * (`save_report` writes the corrected report, `save_transcription` writes the
 * corrected transcription and returns the report to `reviewed`), and `stop` aborts nothing (the provider aborts via the signal the
 * runtime already passes to `sendMessage`). The conversation rail is NOT part
 * of the adapter: the Assistant page drives it through the controlled
 * `conversations` prop from `aiConversationSlice` (user decision), so
 * `listConversations` is deliberately omitted to avoid the Chat runtime
 * auto-load racing the controlled list.
 *
 * @param {Object} [options] - Adapter options.
 * @param {Object | null} [options.currentUser] - The logged-in user (author attribution).
 * @param {string} [options.provider] - The session AI provider sent with each message (`addis` | `gemini` | `nvidia`).
 * @param {boolean} [options.reasoning] - True to request reasoning output from capable providers.
 * @param {() => void} [options.onToolApproved] - Invoked after an approved tool call is applied (lets the host invalidate the shared `Report` cache).
 * @returns {Readonly<Object>} The chat adapter.
 */
export function createAssistantAdapter({
  currentUser = null,
  provider = null,
  reasoning = false,
  onToolApproved = null,
} = {}) {
  return Object.freeze({
    /**
     * Sends a user message and returns the SSE stream as Chat chunks.
     *
     * @param {Object} input - The Chat send-message input.
     * @param {string} [input.conversationId] - The active conversation id.
     * @param {Object} input.message - The user message being sent.
     * @param {AbortSignal} input.signal - Abort signal for the fetch.
     * @returns {Promise<ReadableStream<Object>>} The chunk stream.
     */
    async sendMessage({ conversationId, message, signal }) {
      if (!conversationId) {
        throw new Error('No active conversation');
      }
      const content = message.parts?.find((part) => part.type === 'text')?.text ?? '';
      const response = await fetchWithReauth(
        `${ASSISTANT_BASE}/conversations/${conversationId}/messages`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
          body: JSON.stringify({ content, provider, reasoning }),
          signal,
        },
      );
      if (!response.ok) {
        await throwFromResponse(response, 'Failed to send message');
      }
      if (!response.body) {
        throw new Error('Streaming is not supported by this browser');
      }
      return response.body.pipeThrough(createSseToChunkTransform());
    },

    /**
     * Regenerates a persisted assistant reply (`POST
     * /api/v1/assistant/conversations/:conversationId/messages/:messageId/regenerate`).
     * The MUI runtime removes the old reply before calling us; the server
     * truncates the thread back to the anchoring user message and streams an
     * identical SSE sequence to a fresh send (`start` → text/reasoning, or
     * `reasoning`/tool parts for a report correction). The anchoring user
     * message id (`input.message.id`) is persisted under its server id even
     * for tool-flow replies, so it is used to resolve the truncation point.
     *
     * @param {Object} input - The Chat regenerate input.
     * @param {string} input.conversationId - The active conversation id.
     * @param {string} input.messageId - The assistant reply being regenerated.
     * @param {Object} input.message - The anchoring user message.
     * @param {AbortSignal} input.signal - Abort signal for the fetch.
     * @returns {Promise<ReadableStream<Object>>} The chunk stream.
     */
    async regenerate({ conversationId, messageId, message, signal }) {
      if (!conversationId) {
        throw new Error('No active conversation');
      }
      const anchorId = message?.id || messageId;
      const response = await fetchWithReauth(
        `${ASSISTANT_BASE}/conversations/${conversationId}/messages/${anchorId}/regenerate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
          body: JSON.stringify({ provider, reasoning }),
          signal,
        },
      );
      if (!response.ok) {
        await throwFromResponse(response, 'Failed to regenerate the response');
      }
      if (!response.body) {
        throw new Error('Streaming is not supported by this browser');
      }
      return response.body.pipeThrough(createSseToChunkTransform());
    },

    /**
     * Loads the persisted message history of a conversation.
     *
     * @param {Object} input - The Chat list-messages input.
     * @param {string} input.conversationId - The conversation id.
     * @returns {Promise<{ messages: Object[], hasMore: boolean }>} The mapped messages.
     */
    async listMessages({ conversationId }) {
      const response = await fetchWithReauth(`${ASSISTANT_BASE}/conversations/${conversationId}/messages`);
      if (!response.ok) {
        await throwFromResponse(response, 'Failed to load messages');
      }
      const body = await response.json();
      const messages = body?.data?.messages ?? [];
      return { messages: messages.map((message) => mapBackendMessage(message, currentUser)), hasMore: false };
    },

    /**
     * Resolves a pending `save_transcription` tool call (`POST
     * /api/v1/assistant/tools/:toolCallId/approval`). The `toolCallId` used by
     * the server doubles as the `approvalId` when the runtime reports the
     * decision.
     *
     * @param {Object} input - The Chat tool approval input.
     * @param {string} input.id - The tool call id.
     * @param {boolean} input.approved - True to apply the correction.
     * @param {string} [input.reason] - The user's reason (stored in `Transcription.history`).
     * @returns {Promise<void>}
     */
    async addToolApprovalResponse({ id, approved, reason }) {
      const response = await fetchWithReauth(`${ASSISTANT_BASE}/tools/${id}/approval`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved, reason }),
      });
      if (!response.ok) {
        await throwFromResponse(response, 'Failed to send the tool approval response');
      }
      if (approved) {
        onToolApproved?.();
      }
    },
  });
}
