/**
 * @module utils/constants
 */

/**
 * Frontend-wide frozen constants.
 *
 * @typedef {Object} ApiConfig
 * @property {string} VITE_API_BASE_URL - Backend API base URL (echo of `## Environment Config` §3).
 * @property {string} VITE_APP_NAME - Application display name (echo of `## Environment Config` §3).
 * @typedef {Object} Constants
 * @property {string[]} AUTH_NO_REFRESH_PATHS - Auth endpoints excluded from the 401 refresh retry on public pages (echo of `## Redux RTK Query` §2).
 * @property {string} AUTH_STORAGE_KEY - localStorage key for the persisted user (echo of `## Frontend Architecture` §5).
 * @property {number} SIDEBAR_WIDTH_FULL - Docked sidebar width in px (echo of `## MUI Component Standards` §2.3).
 * @property {number} SIDEBAR_WIDTH_MINI - Mini sidebar width in px (echo of `## MUI Component Standards` §2.3).
 * @property {number} PASSWORD_MIN_LENGTH - Minimum password length (echo of `## Models §1` user schema).
 * @property {string} REPORT_STATUS_DRAFT - Report status: no narration attached (echo of `## Status Machine` §3).
 * @property {string} REPORT_STATUS_AUDIO_ATTACHED - Report status: narration attached (echo of `## Status Machine` §3).
 * @property {string} REPORT_STATUS_TRANSCRIBED - Report status: transcription ready (echo of `## Status Machine` §3).
 * @property {string} REPORT_STATUS_REVIEWED - Report status: transcription reviewed (echo of `## Status Machine` §3).
 * @property {string} REPORT_STATUS_COMPLETED - Report status: report generated (echo of `## Status Machine` §3).
 * @property {string} PROVIDER_ADDIS - AI provider: Addis AI (echo of `## Addis AI` §9).
 * @property {string} PROVIDER_GEMINI - AI provider: Google Gemini (echo of `## Addis AI` §9).
 * @property {string} PROVIDER_NVIDIA - AI provider: NVIDIA (echo of `## Addis AI` §9).
 * @property {number} PAGINATION_DEFAULT_PAGE - Default list page (echo of `## MUI Component Standards` §9.5).
 * @property {number} PAGINATION_DEFAULT_LIMIT - Default list page size (echo of `## MUI Component Standards` §9.5).
 * @property {number} PAGINATION_MAX_LIMIT - Maximum list page size (echo of `## MUI Component Standards` §9.5).
 * @property {string} DATE_PICKER_OPEN_ARIA_LABEL - Aria label of the MuiDatePicker calendar open button.
 * @property {number} AUDIO_MAX_DURATION_SEC - Max recording duration in seconds (echo of `## Environment Config` §5).
 * @property {number} AUDIO_MAX_SIZE_BYTES - Max clip size in bytes (echo of `## Audio Recording STT` §6).
 * @property {number} AUDIO_COUNTDOWN_SECONDS - Recording countdown length in seconds (echo of `## Audio Recording STT` §5.1).
 * @property {number} AUDIO_WAVEFORM_BARS - Waveform FFT bar count (echo of `## Audio Recording STT` §5.1).
 * @property {string} AUDIO_WAVEFORM_COLOR - Waveform FFT bar color (echo of `## Audio Recording STT` §5.1).
 * @property {number} AUDIO_WAVEFORM_FFT_SIZE - AnalyserNode FFT size feeding the waveform bars (F-4-17d).
 * @property {number} AUDIO_WAVEFORM_BAR_WIDTH_RATIO - Fraction of each bar cell filled by the bar (F-4-17d).
 * @property {number} AUDIO_WAVEFORM_FALLBACK_WIDTH - CSS fallback width in px before the canvas is measured (F-4-17d).
* @property {number} AUDIO_WAVEFORM_CANVAS_HEIGHT - CSS fallback height in px before the canvas is measured (F-4-17d).
 * @property {string[]} RECORDER_MIME_PRIORITY - MediaRecorder MIME priority, first supported wins (REQ-141).
 * @property {string} AUDIO_DRAFT_DB_NAME - IndexedDB name for the audio draft store (Phase 4 corrections — REQ-140 exception).
 * @property {string} AUDIO_DRAFT_STORE_NAME - IndexedDB object store for audio drafts (REQ-140 exception).
 * @property {number} AUDIO_DRAFT_DB_VERSION - IndexedDB schema version for the audio draft store.
 * @property {number} SESSION_REFRESH_INTERVAL_MS - Proactive session-refresh interval (before the ~15m access-token expiry).
 */

/** @type {Readonly<ApiConfig>} */
const API_CONFIG = Object.freeze({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
});

/** @type {Readonly<Constants>} */
const AUTH_NO_REFRESH_PATHS = Object.freeze(['/auth/login', '/auth/register', '/auth/refresh']);

/** @type {string} localStorage key for the persisted user (echo of `## Frontend Architecture` §5). */
const AUTH_STORAGE_KEY = 'auth_user';

/** @type {number} Docked sidebar width in px — full mode. */
const SIDEBAR_WIDTH_FULL = 240;

/** @type {number} Docked sidebar width in px — mini mode. */
const SIDEBAR_WIDTH_MINI = 64;

/** @type {number} Minimum password length (echo of `## Models §1` user schema). */
const PASSWORD_MIN_LENGTH = 6;

/** @type {string} Report status: no narration attached yet. */
const REPORT_STATUS_DRAFT = 'draft';

/** @type {string} Report status: narration attached. */
const REPORT_STATUS_AUDIO_ATTACHED = 'audio_attached';

/** @type {string} Report status: transcription ready. */
const REPORT_STATUS_TRANSCRIBED = 'transcribed';

/** @type {string} Report status: transcription reviewed. */
const REPORT_STATUS_REVIEWED = 'reviewed';

/** @type {string} Report status: report generated. */
const REPORT_STATUS_COMPLETED = 'completed';

/** @type {string} AI provider: Addis AI. */
const PROVIDER_ADDIS = 'addis';

/** @type {string} AI provider: Google Gemini. */
const PROVIDER_GEMINI = 'gemini';

/** @type {string} AI provider: NVIDIA. */
const PROVIDER_NVIDIA = 'nvidia';

/** @type {number} Default list page (`## MUI Component Standards` §9.5). */
const PAGINATION_DEFAULT_PAGE = 1;

/** @type {number} Default list page size (`## MUI Component Standards` §9.5). */
const PAGINATION_DEFAULT_LIMIT = 10;

/** @type {number} Maximum list page size (`## MUI Component Standards` §9.5). */
const PAGINATION_MAX_LIMIT = 100;

/** @type {string} Aria label of the MuiDatePicker calendar open button. */
const DATE_PICKER_OPEN_ARIA_LABEL = "Open date picker";

/** @type {number} Max recording duration in seconds — auto-stop at this limit. */
const AUDIO_MAX_DURATION_SEC = 900;

/** @type {number} Max clip size in bytes — oversized clips block submit. */
const AUDIO_MAX_SIZE_BYTES = 52428800;

/** @type {number} Recording countdown length in seconds (3-2-1). */
const AUDIO_COUNTDOWN_SECONDS = 3;

/** @type {number} Waveform FFT bar count. */
const AUDIO_WAVEFORM_BARS = 48;

/** @type {string} Waveform FFT bar color. */
const AUDIO_WAVEFORM_COLOR = "#1976d2";

/** @type {number} AnalyserNode FFT size feeding the waveform bars. */
const AUDIO_WAVEFORM_FFT_SIZE = 256;

/** @type {number} Fraction of each bar cell filled by the bar. */
const AUDIO_WAVEFORM_BAR_WIDTH_RATIO = 0.6;

/** @type {number} CSS fallback width in px before the canvas is measured. */
const AUDIO_WAVEFORM_FALLBACK_WIDTH = 320;

/** @type {number} CSS fallback height in px before the canvas is measured. */
const AUDIO_WAVEFORM_CANVAS_HEIGHT = 64;

/** @type {Readonly<string[]>} MediaRecorder MIME priority (`## Audio Recording STT` §5, REQ-141). */
const RECORDER_MIME_PRIORITY = Object.freeze([
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4",
  "",
]);

/** @type {string} IndexedDB name for the audio draft store (REQ-140 exception, Phase 4 corrections). */
const AUDIO_DRAFT_DB_NAME = "audio-drafts";

/** @type {string} IndexedDB object store holding one record per user (`user:<id>`). */
const AUDIO_DRAFT_STORE_NAME = "drafts";

/** @type {number} IndexedDB schema version of the audio draft store. */
const AUDIO_DRAFT_DB_VERSION = 1;

/** @type {number} Proactive session-refresh interval (keeps the access cookie fresh before its ~15m expiry). */
const SESSION_REFRESH_INTERVAL_MS = 12 * 60 * 1000;

export {
  API_CONFIG,
  AUTH_NO_REFRESH_PATHS,
  AUTH_STORAGE_KEY,
  SIDEBAR_WIDTH_FULL,
  SIDEBAR_WIDTH_MINI,
  PASSWORD_MIN_LENGTH,
  REPORT_STATUS_DRAFT,
  REPORT_STATUS_AUDIO_ATTACHED,
  REPORT_STATUS_TRANSCRIBED,
  REPORT_STATUS_REVIEWED,
  REPORT_STATUS_COMPLETED,
  PROVIDER_ADDIS,
  PROVIDER_GEMINI,
  PROVIDER_NVIDIA,
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_MAX_LIMIT,
  DATE_PICKER_OPEN_ARIA_LABEL,
  AUDIO_MAX_DURATION_SEC,
  AUDIO_MAX_SIZE_BYTES,
  AUDIO_COUNTDOWN_SECONDS,
  AUDIO_WAVEFORM_BARS,
  AUDIO_WAVEFORM_COLOR,
  AUDIO_WAVEFORM_FFT_SIZE,
  AUDIO_WAVEFORM_BAR_WIDTH_RATIO,
  AUDIO_WAVEFORM_FALLBACK_WIDTH,
  AUDIO_WAVEFORM_CANVAS_HEIGHT,
  RECORDER_MIME_PRIORITY,
  AUDIO_DRAFT_DB_NAME,
  AUDIO_DRAFT_STORE_NAME,
  AUDIO_DRAFT_DB_VERSION,
  SESSION_REFRESH_INTERVAL_MS,
};
