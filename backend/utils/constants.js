/**
 * @module utils/constants
 */

/**
 * Backend-wide frozen constants.
 *
 * @typedef {Object} Constants
 * @property {number} AUDIO_MAX_DURATION_SEC - Max audio upload duration in seconds (echo of `## Audio Recording STT` §3).
 * @property {number} AUDIO_MAX_SIZE_BYTES - Max audio upload size in bytes — 50 MB (echo of `## Audio Recording STT` §3).
 * @property {string[]} AUDIO_ALLOWED_MIME_TYPES - Allowed audio MIME types (echo of `## Audio Recording STT` §3).
 * @property {number} PAGINATION_DEFAULT_PAGE - Default page (echo of `## Backend Architecture` §4, REQ-053).
 * @property {number} PAGINATION_DEFAULT_LIMIT - Default page size (echo of `## Backend Architecture` §4, REQ-053).
 * @property {number} PAGINATION_MAX_LIMIT - Maximum page size (echo of `## Backend Architecture` §4, REQ-053).
 * @property {number} ADDIS_AI_STT_MAX_DURATION_SEC - STT chunk duration cap (echo of `## Audio Recording STT` §3).
 * @property {number} BCRYPT_SALT_ROUNDS - Password hashing salt rounds (echo of `## Auth Cookies` §3).
 * @property {number} MONGOOSE_DUPLICATE_KEY_ERROR_CODE - Mongoose duplicate-key error code (echo of `## Error Handling` §2).
 * @property {number} AI_TEMPERATURE - Report generation temperature.
 * @property {number} AI_MAX_OUTPUT_TOKENS - Report generation max output tokens.
 * @property {number} AI_TOP_P - Nucleus sampling threshold.
 * @property {number} AI_TOP_K - Top-k sampling.
 * @property {number} AI_CORRECTION_MAX_OUTPUT_TOKENS - Report correction max output tokens.
 * @property {number} AI_CORRECTION_TEMPERATURE - Report correction temperature.
 * @property {number} ARCHIVE_TTL_SECONDS - Automatic-deletion deadline in seconds — 30 days.
 * @property {number} CLEANUP_SWEEPER_INTERVAL_MS - Cleanup sweeper run interval — per-hour default.
 * @property {number} SHUTDOWN_FORCE_EXIT_TIMEOUT_MS - Graceful-shutdown force-exit deadline — 30 seconds (echo of `## Security` §12, REQ-205).
 * @property {number} RATE_LIMIT_GLOBAL_WINDOW_MS - Global rate-limit window — 15 minutes.
 * @property {number} RATE_LIMIT_GLOBAL_MAX - Global rate-limit cap — 100 requests.
 * @property {number} RATE_LIMIT_AUTH_WINDOW_MS - Auth rate-limit window — 15 minutes.
 * @property {number} RATE_LIMIT_AUTH_MAX - Auth rate-limit cap — 20 requests.
 * @property {number} RATE_LIMIT_AI_WINDOW_MS - AI rate-limit window — 1 minute.
 * @property {number} RATE_LIMIT_AI_MAX - AI rate-limit cap — 10 requests.
 */

/** @type {Readonly<Constants>} */
const constants = Object.freeze({
  AUDIO_MAX_DURATION_SEC: 900,
  AUDIO_MAX_SIZE_BYTES: 52428800,
  AUDIO_ALLOWED_MIME_TYPES: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/webm'],
  PAGINATION_DEFAULT_PAGE: 1,
  PAGINATION_DEFAULT_LIMIT: 10,
  PAGINATION_MAX_LIMIT: 100,
  ADDIS_AI_STT_MAX_DURATION_SEC: 60,
  BCRYPT_SALT_ROUNDS: 12,
  MONGOOSE_DUPLICATE_KEY_ERROR_CODE: 11000,
  AI_TEMPERATURE: 0.2,
  AI_MAX_OUTPUT_TOKENS: 2048,
  AI_TOP_P: 0.9,
  AI_TOP_K: 40,
  AI_CORRECTION_MAX_OUTPUT_TOKENS: 2048,
  AI_CORRECTION_TEMPERATURE: 0.15,
  ARCHIVE_TTL_SECONDS: 2592000,
  CLEANUP_SWEEPER_INTERVAL_MS: 3600000,
  SHUTDOWN_FORCE_EXIT_TIMEOUT_MS: 30000,
  RATE_LIMIT_GLOBAL_WINDOW_MS: 15 * 60 * 1000,
  RATE_LIMIT_GLOBAL_MAX: 100,
  RATE_LIMIT_AUTH_WINDOW_MS: 15 * 60 * 1000,
  RATE_LIMIT_AUTH_MAX: 20,
  RATE_LIMIT_AI_WINDOW_MS: 60 * 1000,
  RATE_LIMIT_AI_MAX: 10,
});

export default constants;
