/**
 * @module services/oauth
 */

import env from '../config/env.js';
import constants from '../utils/constants.js';
import { CustomError } from '../utils/error.js';
import { SERVICE_UNAVAILABLE } from '../utils/httpStatus.js';

/** @type {string} Google OAuth 2.0 authorization endpoint. */
const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

/** @type {string} Google OAuth 2.0 token endpoint. */
const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

/** @type {string} Google userinfo endpoint (profile scope). */
const GOOGLE_USERINFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v2/userinfo';

/** @type {string[]} Consent scopes — identity plus the `drive.file` scope (REQ-158, AD-012). */
const GOOGLE_SCOPES = ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/drive.file'];

/**
 * True when every OAUTH_GOOGLE_* key is present in the environment and no
 * key still carries the local placeholder value; Google stays stubbed until
 * then (REQ-091).
 *
 * @returns {boolean} Whether Google OAuth is configured.
 */
function isGoogleOAuthConfigured() {
  return [
    env.OAUTH_GOOGLE_CLIENT_ID,
    env.OAUTH_GOOGLE_CLIENT_SECRET,
    env.OAUTH_GOOGLE_CALLBACK_URL,
  ].every((value) => value && value !== constants.OAUTH_GOOGLE_PLACEHOLDER);
}

/**
 * Builds the Google consent URL carrying the `drive.file` scope.
 *
 * @returns {string} The consent URL.
 * @throws {CustomError} SERVICE_UNAVAILABLE while credentials are unconfigured.
 */
function getGoogleOAuthUrl() {
  if (!isGoogleOAuthConfigured()) {
    throw new CustomError(SERVICE_UNAVAILABLE, 'Google sign-in is not configured yet');
  }
  const params = new URLSearchParams({
    client_id: env.OAUTH_GOOGLE_CLIENT_ID,
    redirect_uri: env.OAUTH_GOOGLE_CALLBACK_URL,
    response_type: 'code',
    scope: GOOGLE_SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'consent',
  });
  return `${GOOGLE_AUTH_ENDPOINT}?${params.toString()}`;
}

/**
 * Exchanges the authorization code for Google tokens (provider-side only;
 * the user's OAuth token never leaves the server — REQ-177).
 *
 * @param {string} code - The authorization code from the callback.
 * @returns {Promise<{ access_token: string, refresh_token?: string, id_token?: string }>} The token payload.
 * @throws {CustomError} SERVICE_UNAVAILABLE when the exchange fails.
 */
async function exchangeCodeForTokens(code) {
  const body = new URLSearchParams({
    code,
    client_id: env.OAUTH_GOOGLE_CLIENT_ID,
    client_secret: env.OAUTH_GOOGLE_CLIENT_SECRET,
    redirect_uri: env.OAUTH_GOOGLE_CALLBACK_URL,
    grant_type: 'authorization_code',
  });
  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!response.ok) {
    throw new CustomError(SERVICE_UNAVAILABLE, 'Google token exchange failed');
  }
  return response.json();
}

/**
 * Fetches the Google profile for the exchanged access token.
 *
 * @param {string} accessToken - The Google access token.
 * @returns {Promise<{ email: string, name: string, picture: string }>} The user profile.
 * @throws {CustomError} SERVICE_UNAVAILABLE when the request fails.
 */
async function fetchGoogleUserInfo(accessToken) {
  const response = await fetch(GOOGLE_USERINFO_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new CustomError(SERVICE_UNAVAILABLE, 'Google user info request failed');
  }
  return response.json();
}

/**
 * Full login-flow helper: code → tokens → profile. Provider-neutral seam:
 * future providers extend this service with the same shape (REQ-091).
 *
 * @param {string} code - The authorization code from the callback.
 * @returns {Promise<{ email: string, name: string, picture: string }>} The Google profile.
 * @throws {CustomError} SERVICE_UNAVAILABLE on any provider failure.
 */
async function exchangeCodeForProfile(code) {
  const tokens = await exchangeCodeForTokens(code);
  return fetchGoogleUserInfo(tokens.access_token);
}

export { exchangeCodeForProfile, fetchGoogleUserInfo, getGoogleOAuthUrl, isGoogleOAuthConfigured };
