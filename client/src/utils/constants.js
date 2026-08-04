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
};
