/**
 * @module services/addis
 * @description Addis AI integration (backend-only proxy, REQ-125): the STT
 * pipeline of `## Audio Recording STT` §8 — single-pass ffmpeg WAV
 * conversion (`pcm_s16le`, 16 kHz, mono), in-memory PCM-level splitting via
 * `utils/wavSplitter.js`, and per-chunk calls to
 * `POST {ADDIS_AI_BASE_URL}/api/v2/stt` (REQ-128). Calls are made with
 * native `fetch` (REQ-125) and the `x-api-key` header (REQ-126); the key
 * lives only in `backend/.env` (REQ-123).
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import env from '../config/env.js';
import constants from '../utils/constants.js';
import { createChildLogger } from '../utils/logger.js';
import { splitWavChunks } from '../utils/wavSplitter.js';

const execFileAsync = promisify(execFile);

const addisLogger = createChildLogger('AddisAI');

/**
 * A failed STT chunk request.
 *
 * @typedef {Object} SttChunkError
 * @property {boolean} retryable - True when the request is worth retrying (network/429/503).
 * @property {number} statusCode - HTTP status when the provider answered, 0 for network errors.
 * @property {string} message - Client-safe mapped message (never raw provider text, REQ-129).
 * @property {string} [requestId] - Addis AI request id for logs when known.
 */

/**
 * Maps an Addis AI HTTP status to a safe user message (`## Addis AI` §12,
 * REQ-129): raw provider messages never reach the client.
 *
 * @param {number} statusCode - The provider HTTP status.
 * @returns {string} The safe message.
 */
export function mapSttError(statusCode) {
  switch (statusCode) {
    case 400:
      return 'Addis AI rejected the audio request';
    case 401:
      return 'Addis AI authentication failed';
    case 403:
      return 'Addis AI permission denied';
    case 404:
      return 'Addis AI endpoint not found';
    case 429:
      return 'Addis AI rate limit reached';
    case 500:
      return 'Addis AI server error';
    case 503:
      return 'Addis AI service unavailable';
    default:
      return 'Addis AI request failed';
  }
}

/**
 * Converts an audio file to WAV in a single ffmpeg pass to stdout
 * (`pcm_s16le`, 16 kHz, mono — never re-encoded per segment,
 * `## Audio Recording STT` §8, REQ-144). Nothing touches disk, so there is
 * nothing to clean up on shutdown.
 *
 * @param {string} filePath - The stored clip path.
 * @param {Object} [options] - Conversion options.
 * @param {string} [options.ffmpegPath] - ffmpeg binary path.
 * @param {number} [options.sampleRate] - Output sample rate in Hz.
 * @param {number} [options.channels] - Output channel count.
 * @param {string} [options.codec] - Output codec.
 * @returns {Promise<Buffer>} The complete WAV file bytes.
 */
export async function convertToWav(
  filePath,
  {
    ffmpegPath = env.FFMPEG_PATH,
    sampleRate = constants.AUDIO_WAV_SAMPLE_RATE,
    channels = constants.AUDIO_WAV_CHANNELS,
    codec = constants.AUDIO_WAV_CODEC,
  } = {},
) {
  const { stdout } = await execFileAsync(
    ffmpegPath,
    [
      '-i',
      filePath,
      '-ac',
      String(channels),
      '-ar',
      String(sampleRate),
      '-c:a',
      codec,
      '-f',
      'wav',
      'pipe:1',
    ],
    { maxBuffer: constants.AUDIO_FFMPEG_MAX_BUFFER_BYTES, encoding: 'buffer' },
  );
  return stdout;
}

/**
 * Sends one WAV chunk to the Addis AI STT endpoint as multipart
 * `audio` + `request_data` `{ language_code }` (`## Addis AI` §7): each
 * chunk is at most `ADDIS_AI_STT_MAX_DURATION_SEC` = 60 s and 10 MB per
 * request (REQ-128) and carries MIME `audio/wav` — never `audio/webm`
 * (`## Audio Recording STT` §8).
 *
 * @param {Buffer} wavChunk - A complete WAV chunk buffer.
 * @param {Object} [options] - Request options.
 * @param {Function} [options.fetchImpl] - The fetch implementation (injectable for probes).
 * @param {string} [options.baseUrl] - Addis AI API base URL.
 * @param {string} [options.apiKey] - Addis AI API key.
 * @param {string} [options.languageCode] - STT language code (`am`).
 * @param {number} [options.timeoutMs] - Request timeout.
 * @param {number} [options.retries] - Network-failure retry count.
 * @param {number[]} [options.backoffMs] - Retry backoff schedule.
 * @param {string} [options.wavMime] - Chunk MIME type.
 * @returns {Promise<{ text: string, requestId: string }>} The transcription and provider request id.
 * @throws {Error} REQ-128 cap exceeded (chunk > 10 MB) — never retried.
 * @throws {Object} statusCode/message on provider or empty-transcription failures; 429/503 and network errors retry per the backoff schedule.
 */
export async function transcribeWavChunk(
  wavChunk,
  {
    fetchImpl = globalThis.fetch,
    baseUrl = env.ADDIS_AI_BASE_URL,
    apiKey = env.ADDIS_AI_API_KEY,
    languageCode = env.ADDIS_AI_STT_LANGUAGE_CODE,
    timeoutMs = env.ADDIS_AI_TIMEOUT_MS,
    retries = constants.ADDIS_AI_STT_NETWORK_RETRIES,
    backoffMs = constants.ADDIS_AI_STT_RETRY_BACKOFF_MS,
    wavMime = constants.AUDIO_WAV_MIME,
  } = {},
) {
  if (wavChunk.length > constants.ADDIS_AI_STT_MAX_BYTES_PER_REQUEST) {
    throw new Error('STT chunk exceeds the 10 MB per-request cap');
  }
  let lastError = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const formData = new FormData();
      formData.append('audio', new Blob([wavChunk], { type: wavMime }), 'chunk.wav');
      formData.append('request_data', JSON.stringify({ language_code: languageCode }));
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetchImpl(`${baseUrl}/api/v2/stt`, {
          method: 'POST',
          headers: { 'x-api-key': apiKey },
          body: formData,
          signal: controller.signal,
        });
        if (!response.ok) {
          const error = {
            retryable: response.status === 429 || response.status === 503,
            statusCode: response.status,
            message: mapSttError(response.status),
          };
          throw error;
        }
        const body = await response.json();
        if (body?.status !== 'success' || typeof body?.data?.transcription !== 'string') {
          const error = {
            retryable: false,
            statusCode: 200,
            message: 'Addis AI returned an unexpected response',
          };
          throw error;
        }
        if (!body.data.transcription.trim()) {
          const error = {
            retryable: false,
            statusCode: 200,
            message: 'Addis AI returned an empty transcription',
          };
          throw error;
        }
        const requestId = body.data.usage_metadata?.requestId ?? '';
        return { text: body.data.transcription, requestId };
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      // Network/abort errors (fetch TypeError, AbortError) carry no status
      // code and are always retryable; provider answers keep their mapped
      // retryability (429/503 retry, other 4xx/5xx fail fast).
      const wrapped =
        error && error.statusCode !== undefined
          ? error
          : { retryable: true, statusCode: 0, message: 'Addis AI could not be reached', requestId: '' };
      lastError = wrapped;
      if (wrapped.retryable && attempt < retries) {
        const delay = backoffMs[attempt] ?? backoffMs[backoffMs.length - 1];
        addisLogger.warn('STT chunk request retrying', { attempt: attempt + 1, statusCode: wrapped.statusCode });
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw wrapped;
      }
    }
  }
  throw lastError;
}

/**
 * Maps an Addis AI status/error to a safe user message for the text
 * generation path (`## Addis AI` §8, REQ-129) — a superset of the STT map
 * so chat_generate errors surface consistently.
 *
 * @param {number} statusCode - The provider HTTP status.
 * @returns {string} The safe message.
 */
export function mapTextError(statusCode) {
  return mapSttError(statusCode);
}

/**
 * Sends one text-generation request to the Addis AI endpoint
 * `POST {baseUrl}/api/v1/chat_generate` (`## Addis AI` §6, REQ-127) with
 * the assembled prompt (`## AI Prompt Spec` §7), the frozen generation or
 * correction config (REQ-124), and `x-api-key` auth (REQ-126). Uses native
 * `fetch` (REQ-125). Network failures retry per the backoff schedule;
 * provider 4xx/5xx fail fast with the mapped message (REQ-129).
 *
 * @param {string} prompt - The assembled directive text (`utils/promptSeeds.js`).
 * @param {Object} [options] - Request options.
 * @param {Function} [options.fetchImpl] - The fetch implementation (injectable for probes).
 * @param {string} [options.baseUrl] - Addis AI API base URL.
 * @param {string} [options.apiKey] - Addis AI API key.
 * @param {string} [options.model] - The Addis text model id.
 * @param {string} [options.targetLanguage] - Response language (`am`).
 * @param {Array<{role: string, content: string}>} [options.history] - Prior conversation turns.
 * @param {Object} [options.generationConfig] - Frozen generation config (temperature, maxOutputTokens, topP, topK).
 * @param {number} [options.timeoutMs] - Request timeout.
 * @param {number} [options.retries] - Network-failure retry count.
 * @param {number[]} [options.backoffMs] - Retry backoff schedule.
 * @returns {Promise<{ text: string, requestId: string }>} The generated text and provider request id.
 * @throws {Object} statusCode/message on provider or empty-output failures; network/429/503 retry per the backoff schedule.
 */
export async function generateText(
  prompt,
  {
    fetchImpl = globalThis.fetch,
    baseUrl = env.ADDIS_AI_BASE_URL,
    apiKey = env.ADDIS_AI_API_KEY,
    model = env.ADDIS_AI_TEXT_MODEL,
    targetLanguage = env.ADDIS_AI_DEFAULT_TARGET_LANGUAGE,
    history = [],
    generationConfig = {
      temperature: constants.AI_TEMPERATURE,
      maxOutputTokens: constants.AI_MAX_OUTPUT_TOKENS,
      topP: constants.AI_TOP_P,
      topK: constants.AI_TOP_K,
    },
    timeoutMs = env.ADDIS_AI_TIMEOUT_MS,
    retries = constants.AI_NETWORK_RETRIES,
    backoffMs = constants.AI_RETRY_BACKOFF_MS,
  } = {},
) {
  let lastError = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetchImpl(`${baseUrl}/api/v1/chat_generate`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-api-key': apiKey },
          body: JSON.stringify({
            model,
            prompt,
            target_language: targetLanguage,
            conversation_history: history,
            generation_config: generationConfig,
          }),
          signal: controller.signal,
        });
        if (!response.ok) {
          const error = {
            retryable: response.status === 429 || response.status === 503,
            statusCode: response.status,
            message: mapTextError(response.status),
          };
          throw error;
        }
        const body = await response.json();
        if (typeof body?.data?.response_text !== 'string' || !body.data.response_text.trim()) {
          const error = {
            retryable: false,
            statusCode: 200,
            message: 'Addis AI returned an empty report',
          };
          throw error;
        }
        const requestId = body.data.usage_metadata?.requestId ?? '';
        return { text: body.data.response_text, requestId };
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      const wrapped =
        error && error.statusCode !== undefined
          ? error
          : { retryable: true, statusCode: 0, message: 'Addis AI could not be reached', requestId: '' };
      lastError = wrapped;
      if (wrapped.retryable && attempt < retries) {
        const delay = backoffMs[attempt] ?? backoffMs[backoffMs.length - 1];
        addisLogger.warn('Text generation request retrying', { attempt: attempt + 1, statusCode: wrapped.statusCode });
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw wrapped;
      }
    }
  }
  throw lastError;
}

/**
 * Runs the full STT pipeline over one stored clip: single-pass WAV
 * conversion → PCM-level chunking → one `v2/stt` call per chunk
 * (`## Audio Recording STT` §8). Provider 4xx/5xx failures mark the chunk
 * as failed and continue with the remaining chunks (REQ-129); a clip whose
 * chunks all failed returns `text: null`.
 *
 * @param {string} filePath - The stored clip path.
 * @param {Object} [options] - Pipeline options (forwarded to `convertToWav` and `transcribeWavChunk`).
 * @returns {Promise<{ text: string | null, total: number, succeeded: number }>} The concatenated transcription and per-chunk stats.
 */
export async function transcribeFile(filePath, options = {}) {
  const wav = await convertToWav(filePath, options);
  const chunks = splitWavChunks(wav, { chunkDurationSec: options.chunkDurationSec });
  const parts = [];
  let succeeded = 0;
  for (let index = 0; index < chunks.length; index += 1) {
    try {
      const { text, requestId } = await transcribeWavChunk(chunks[index], options);
      parts.push(text.trim());
      succeeded += 1;
      addisLogger.info('STT chunk transcribed', { chunkIndex: index, requestId });
    } catch (error) {
      addisLogger.warn('STT chunk failed', {
        chunkIndex: index,
        statusCode: error.statusCode,
        requestId: error.requestId,
        message: error.message,
      });
    }
  }
  return {
    text: succeeded > 0 ? parts.filter(Boolean).join(' ') : null,
    total: chunks.length,
    succeeded,
  };
}
