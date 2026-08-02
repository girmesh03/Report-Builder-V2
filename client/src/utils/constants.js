/**
 * @module utils/constants
 */

/**
 * Frontend-wide frozen constants.
 *
 * @typedef {Object} ApiConfig
 * @property {string} VITE_API_BASE_URL - Backend API base URL (echo of `## Environment Config` §3).
 * @property {string} VITE_APP_NAME - Application display name (echo of `## Environment Config` §3).
 */

/** @type {Readonly<ApiConfig>} */
const API_CONFIG = Object.freeze({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
});

export { API_CONFIG };
