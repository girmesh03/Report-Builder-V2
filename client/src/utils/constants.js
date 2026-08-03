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

export { API_CONFIG, AUTH_NO_REFRESH_PATHS, AUTH_STORAGE_KEY, SIDEBAR_WIDTH_FULL, SIDEBAR_WIDTH_MINI, PASSWORD_MIN_LENGTH };
