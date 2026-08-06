/**
 * @module services/gemini
 * @description Gemini text-generation integration (`## Other AI Providers`
 * §4, REQ-136): model `gemini-3.1-flash-lite` via axios (REQ-138) over
 * `POST {GEMINI_API_BASE_URL}/models/{model}:generateContent?key=…` — the
 * key travels as the documented query parameter but only from backend
 * services, never from the client (REQ-123). The generation config is the
 * frozen constants AI Generation group (REQ-124, REQ-136). No streaming
 * (REQ-136). Network failures retry per the backoff schedule; provider
 * errors map to 502 (REQ-136, following the `## Addis AI` §12 pattern).
 */

import axios from 'axios';

import env from '../config/env.js';
import constants from '../utils/constants.js';
import { createChildLogger } from '../utils/logger.js';

const geminiLogger = createChildLogger('AI-Gemini');

const { GEMINI_API_KEY, GEMINI_API_BASE_URL, GEMINI_MODEL: ENV_GEMINI_MODEL } = env;

/** @type {string} The effective Gemini model (env override wins, else the frozen constant). */
const GEMINI_MODEL = ENV_GEMINI_MODEL || constants.GEMINI_MODEL;

/**
 * Maps a Gemini HTTP status to a safe user message (REQ-136, 502 pattern):
 * raw provider text never reaches the client (REQ-129).
 *
 * @param {number} statusCode - The provider HTTP status.
 * @returns {string} The safe message.
 */
export function mapGeminiError(statusCode) {
  switch (statusCode) {
    case 400:
      return 'Gemini rejected the generation request';
    case 401:
      return 'Gemini authentication failed';
    case 403:
      return 'Gemini permission denied';
    case 404:
      return 'Gemini endpoint not found';
    case 429:
      return 'Gemini rate limit reached';
    case 500:
      return 'Gemini server error';
    case 503:
      return 'Gemini service unavailable';
    default:
      return 'Gemini request failed';
  }
}

/**
 * Sends one text-generation request to Gemini with axios (`## Other AI
 * Providers` §4): `contents` carries the conversation history,
 * `systemInstruction` the system prompt, and `generationConfig` the frozen
 * constants group (REQ-124, REQ-136). Optional reasoning: when `reasoning` is
 * true the request enables the model's `thinkingConfig` and the `thought`
 * parts of the response are returned alongside the answer text (user
 * follow-up — reasoning-aware models such as the DeepSeek flash line). No
 * streaming; network/429/503 retry per the backoff schedule, other provider
 * answers fail fast.
 *
 * @param {Object} payload - The generation payload.
 * @param {string} payload.prompt - The assembled directive text (`utils/promptSeeds.js`).
 * @param {string} payload.systemPrompt - The system prompt (`## AI Prompt Spec` §9).
 * @param {Array<{role: string, content: string}>} payload.history - Conversation turns.
 * @param {boolean} [payload.reasoning] - True to enable model thinking and return the thought text.
 * @param {Object} [options] - Request options.
 * @param {Object} [options.axiosImpl] - The axios implementation (injectable for probes).
 * @param {number} [options.timeoutMs] - Request timeout.
 * @param {number} [options.retries] - Network-failure retry count.
 * @param {number[]} [options.backoffMs] - Retry backoff schedule.
 * @param {Object} [options.generationConfig] - Frozen generation config.
 * @returns {Promise<{ text: string, requestId: string, reasoning?: string }>} The generated text, request id, and (when enabled) the thought text.
 * @throws {Object} statusCode/message on provider or empty-output failures; network/429/503 retry per the backoff schedule.
 */
export async function generateGeminiText(
  { systemPrompt, history = [], prompt, reasoning = false },
  {
    axiosImpl = axios,
    timeoutMs = 60000,
    retries = constants.AI_NETWORK_RETRIES,
    backoffMs = constants.AI_RETRY_BACKOFF_MS,
    generationConfig = {
      temperature: constants.AI_TEMPERATURE,
      maxOutputTokens: constants.AI_MAX_OUTPUT_TOKENS,
      topP: constants.AI_TOP_P,
      topK: constants.AI_TOP_K,
    },
  } = {},
) {
  const contents = history.map((turn) => ({ role: turn.role, parts: [{ text: turn.content }] }));
  contents.push({ role: 'user', parts: [{ text: prompt }] });
  const requestGenerationConfig = reasoning
    ? { ...generationConfig, thinkingConfig: { thinkingBudget: constants.AI_REASONING_THINKING_BUDGET } }
    : generationConfig;
  const url = `${GEMINI_API_BASE_URL}/models/${GEMINI_MODEL}:generateContent`;
  let lastError = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const { data } = await axiosImpl.post(
        url,
        {
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: requestGenerationConfig,
        },
        {
          params: { key: GEMINI_API_KEY },
          timeout: timeoutMs,
        },
      );
      const parts = data?.candidates?.[0]?.content?.parts ?? [];
      const text = parts.filter((part) => part.thought !== true).map((part) => part.text ?? '').join('');
      const reasoningText = parts
        .filter((part) => part.thought === true)
        .map((part) => part.text ?? '')
        .join('\n');
      if (!text.trim()) {
        const error = { retryable: false, statusCode: 200, message: 'Gemini returned an empty report' };
        throw error;
      }
      const requestId = String(data?.modelVersion ?? '');
      return { text, requestId, reasoning: reasoningText || undefined };
    } catch (error) {
      const statusCode = error?.response?.status ?? 0;
      const wrapped =
        statusCode !== 0
          ? { retryable: statusCode === 429 || statusCode === 503, statusCode, message: mapGeminiError(statusCode) }
          : { retryable: true, statusCode: 0, message: 'Gemini could not be reached' };
      lastError = wrapped;
      if (wrapped.retryable && attempt < retries) {
        const delay = backoffMs[attempt] ?? backoffMs[backoffMs.length - 1];
        geminiLogger.warn('Gemini generation request retrying', { attempt: attempt + 1, statusCode: wrapped.statusCode });
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw wrapped;
      }
    }
  }
  throw lastError;
}