/**
 * @module services/nvidia
 * @description Nvidia text-generation integration (`## Other AI Providers`
 * §5, REQ-137): model `deepseek-ai/deepseek-v4-flash` via axios (REQ-138) over the Nvidia
 * NIM `chat/completions` message format with `Authorization: Bearer` — the
 * key is sent only from backend services, never from the client (REQ-123).
 * Same retry pattern as Gemini: network failures retry per the backoff
 * schedule; provider errors map to 502 (REQ-137).
 */

import axios from 'axios';

import env from '../config/env.js';
import constants from '../utils/constants.js';
import { createChildLogger } from '../utils/logger.js';

const nvidiaLogger = createChildLogger('AI-Nvidia');

const { NVIDIA_API_KEY, NVIDIA_API_BASE_URL, NVIDIA_MODEL: ENV_NVIDIA_MODEL } = env;

/** @type {string} The effective NVIDIA model (env override wins, else the frozen constant). */
const NVIDIA_MODEL = ENV_NVIDIA_MODEL || constants.NVIDIA_MODEL;

/**
 * Maps an Nvidia HTTP status to a safe user message (REQ-137, 502 pattern):
 * raw provider text never reaches the client (REQ-129).
 *
 * @param {number} statusCode - The provider HTTP status.
 * @returns {string} The safe message.
 */
export function mapNvidiaError(statusCode) {
  switch (statusCode) {
    case 400:
      return 'Nvidia rejected the generation request';
    case 401:
      return 'Nvidia authentication failed';
    case 403:
      return 'Nvidia permission denied';
    case 404:
      return 'Nvidia endpoint not found';
    case 429:
      return 'Nvidia rate limit reached';
    case 500:
      return 'Nvidia server error';
    case 503:
      return 'Nvidia service unavailable';
    default:
      return 'Nvidia request failed';
  }
}

/**
 * Sends one text-generation request to the Nvidia NIM API with axios
 * (`## Other AI Providers` §5): the assembled modifier seeds go through the
 * Nvidia message format; the system role carries the system prompt and
 * `Authorization: Bearer` authenticates (REQ-137). Optional reasoning: when
 * `reasoning` is true the request asks the (reasoning-capable) model to emit
 * its chain of thought and `message.reasoning_content` is returned alongside
 * the answer text (user follow-up — DeepSeek flash line reasoning). No
 * streaming; the directive seeds arrive the same way in fallback mode
 * (REQ-134, REQ-137).
 *
 * @param {Object} payload - The generation payload.
 * @param {string} payload.prompt - The assembled directive text (`utils/promptSeeds.js`).
 * @param {string} payload.systemPrompt - The system prompt (`## AI Prompt Spec` §9).
 * @param {Array<{role: string, content: string}>} payload.history - Conversation turns.
 * @param {boolean} [payload.reasoning] - True to request reasoning output.
 * @param {Object} [options] - Request options.
 * @param {Object} [options.axiosImpl] - The axios implementation (injectable for probes).
 * @param {string} [options.apiKey] - Nvidia API key; defaults to `NVIDIA_API_KEY`.
 * @param {number} [options.timeoutMs] - Request timeout.
 * @param {number} [options.retries] - Network-failure retry count.
 * @param {number[]} [options.backoffMs] - Retry backoff schedule.
 * @param {Object} [options.generationConfig] - Frozen generation config.
 * @returns {Promise<{ text: string, requestId: string, reasoning?: string }>} The generated text, request id, and (when enabled) the reasoning text.
 * @throws {Object} statusCode/message on provider or empty-output failures; network/429/503 retry per the backoff schedule.
 */
export async function generateNvidiaText(
  { systemPrompt, history = [], prompt, reasoning = false },
  {
    axiosImpl = axios,
    apiKey = NVIDIA_API_KEY,
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
  const messages = [{ role: 'system', content: systemPrompt }];
  for (const turn of history) {
    messages.push({ role: turn.role, content: turn.content });
  }
  messages.push({ role: 'user', content: prompt });
  const body = {
    model: NVIDIA_MODEL,
    messages,
    temperature: generationConfig.temperature,
    max_tokens: generationConfig.maxOutputTokens,
    top_p: generationConfig.topP,
    top_k: generationConfig.topK,
  };
  if (reasoning) {
    // DeepSeek/NIM convention: request reasoning output for capable models.
    body.enable_reasoning = true;
    body.max_reasoning_tokens = constants.AI_REASONING_MAX_TOKENS;
  }
  const url = `${NVIDIA_API_BASE_URL}/chat/completions`;
  let lastError = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const { data } = await axiosImpl.post(
        url,
        body,
        {
          headers: { Authorization: `Bearer ${apiKey}` },
          timeout: timeoutMs,
        },
      );
      const message = data?.choices?.[0]?.message ?? {};
      const text = message.content ?? '';
      const reasoningText = message.reasoning_content ?? message.reasoning ?? null;
      if (!text.trim()) {
        const error = { retryable: false, statusCode: 200, message: 'Nvidia returned an empty report' };
        throw error;
      }
      const requestId = String(data?.id ?? '');
      return { text, requestId, reasoning: reasoningText || undefined };
    } catch (error) {
      const statusCode = error?.response?.status ?? 0;
      const wrapped =
        statusCode !== 0
          ? { retryable: statusCode === 429 || statusCode === 503, statusCode, message: mapNvidiaError(statusCode) }
          : { retryable: true, statusCode: 0, message: 'Nvidia could not be reached' };
      lastError = wrapped;
      if (wrapped.retryable && attempt < retries) {
        const delay = backoffMs[attempt] ?? backoffMs[backoffMs.length - 1];
        nvidiaLogger.warn('Nvidia generation request retrying', { attempt: attempt + 1, statusCode: wrapped.statusCode });
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw wrapped;
      }
    }
  }
  throw lastError;
}