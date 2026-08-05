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
 * @property {string} COOKIE_ACCESS_TOKEN - Access-token httpOnly cookie name (echo of `## Security` §2).
 * @property {string} COOKIE_REFRESH_TOKEN - Refresh-token httpOnly cookie name (echo of `## Security` §2).
 * @property {number} COOKIE_ACCESS_MAX_AGE_MS - Access-cookie lifetime — 15 minutes (echo of `## Auth Cookies` §1).
 * @property {number} COOKIE_REFRESH_MAX_AGE_MS - Refresh-cookie lifetime — 7 days (echo of `## Auth Cookies` §1).
 * @property {number} PASSWORD_MIN_LENGTH - Minimum registration password length (echo of `## UI/UX Spec` register form rule).
 * @property {string} OAUTH_GOOGLE_PLACEHOLDER - Unconfigured-credentials placeholder in the local `backend/.env` (REQ-091).
 * @property {string} REPORT_STATUS_DRAFT - Report status: metadata created, no audio yet (echo of `## Data Modeling` §6).
 * @property {string} REPORT_STATUS_AUDIO_ATTACHED - Report status: audio linked, ready for transcription (echo of `## Data Modeling` §6).
 * @property {string} REPORT_STATUS_TRANSCRIBED - Report status: transcription produced (echo of `## Data Modeling` §6).
 * @property {string} REPORT_STATUS_REVIEWED - Report status: transcription reviewed (echo of `## Data Modeling` §6).
 * @property {string} REPORT_STATUS_COMPLETED - Report status: final report generated (echo of `## Data Modeling` §6).
 * @property {string} PROVIDER_ADDIS - Text-generation provider Addis AI (echo of `## Data Modeling` §4.1).
 * @property {string} PROVIDER_GEMINI - Text-generation provider Gemini (echo of `## Data Modeling` §4.1).
 * @property {string} PROVIDER_NVIDIA - Text-generation provider Nvidia (echo of `## Data Modeling` §4.1).
 * @property {string} UPLOADS_AUDIO_DIR - Audio upload directory, relative to `backend/` (gitignored, `## Audio Recording STT` §7).
 * @property {number} UPLOAD_MAX_FILES_PER_REQUEST - Max clips per upload request — 10 (echo of `## API Contract` §6.1).
 * @property {number} AUDIO_PROBE_TIMEOUT_MS - ffprobe duration-parse timeout — 30 seconds.
 * @property {number} AUDIO_FFMPEG_MAX_BUFFER_BYTES - ffmpeg stdout capture cap — 100 MB (a 15-minute 16 kHz mono s16le WAV fits).
 * @property {number} AUDIO_WAV_SAMPLE_RATE - STT chunk sample rate in Hz — 16 kHz (echo of `## Audio Recording STT` §8).
 * @property {number} AUDIO_WAV_CHANNELS - STT chunk channel count — mono (echo of `## Audio Recording STT` §8).
 * @property {string} AUDIO_WAV_CODEC - STT chunk ffmpeg codec — PCM s16le (echo of `## Audio Recording STT` §8).
 * @property {string} AUDIO_WAV_MIME - STT chunk MIME type — `audio/wav`, never `audio/webm` (echo of `## Audio Recording STT` §8).
 * @property {number} ADDIS_AI_STT_MAX_BYTES_PER_REQUEST - Addis AI per-request cap — 10 MB (echo of `## Addis AI` §7, REQ-128).
 * @property {number} ADDIS_AI_STT_NETWORK_RETRIES - STT network-failure retry count — 3 (echo of `## Addis AI` §12, REQ-129).
 * @property {number[]} ADDIS_AI_STT_RETRY_BACKOFF_MS - STT retry backoff schedule in ms — 1s, 2s, 4s (echo of `## Addis AI` §12, REQ-129).
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
  COOKIE_ACCESS_TOKEN: 'accessToken',
  COOKIE_REFRESH_TOKEN: 'refreshToken',
  COOKIE_ACCESS_MAX_AGE_MS: 15 * 60 * 1000,
  COOKIE_REFRESH_MAX_AGE_MS: 7 * 24 * 60 * 60 * 1000,
  PASSWORD_MIN_LENGTH: 6,
  OAUTH_GOOGLE_PLACEHOLDER: 'change me',
  REPORT_STATUS_DRAFT: 'draft',
  REPORT_STATUS_AUDIO_ATTACHED: 'audio_attached',
  REPORT_STATUS_TRANSCRIBED: 'transcribed',
  REPORT_STATUS_REVIEWED: 'reviewed',
  REPORT_STATUS_COMPLETED: 'completed',
  PROVIDER_ADDIS: 'addis',
  PROVIDER_GEMINI: 'gemini',
  PROVIDER_NVIDIA: 'nvidia',
  UPLOADS_AUDIO_DIR: 'uploads/audio',
  UPLOAD_MAX_FILES_PER_REQUEST: 10,
  AUDIO_PROBE_TIMEOUT_MS: 30000,
  AUDIO_FFMPEG_MAX_BUFFER_BYTES: 104857600,
  AUDIO_WAV_SAMPLE_RATE: 16000,
  AUDIO_WAV_CHANNELS: 1,
  AUDIO_WAV_CODEC: 'pcm_s16le',
  AUDIO_WAV_MIME: 'audio/wav',
  ADDIS_AI_STT_MAX_BYTES_PER_REQUEST: 10485760,
  ADDIS_AI_STT_NETWORK_RETRIES: 3,
  ADDIS_AI_STT_RETRY_BACKOFF_MS: [1000, 2000, 4000],
});

export default constants;
