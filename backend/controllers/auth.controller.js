/**
 * @module controllers/auth
 */

import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import env from '../config/env.js';
import constants from '../utils/constants.js';
import User from '../models/user.model.js';
import { CustomError } from '../utils/error.js';
import { BAD_REQUEST, CONFLICT, CREATED, OK, UNAUTHORIZED } from '../utils/httpStatus.js';
import logger from '../utils/logger.js';
import {
  exchangeCodeForProfile,
  getGoogleOAuthUrl,
} from '../services/oauth.service.js';

/** @type {number} Random-password entropy for OAuth-only accounts, in bytes. */
const OAUTH_RANDOM_PASSWORD_BYTES = 32;

/**
 * Signs a fresh access/refresh token pair for the user, persists the rotated
 * refresh token, and returns both tokens.
 *
 * @param {import('mongoose').Model} user - The authenticated user document.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>} The token pair.
 */
async function issueTokens(user) {
  const accessToken = jwt.sign(
    { id: user._id.toString() },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRES_IN },
  );
  const refreshToken = jwt.sign(
    { id: user._id.toString() },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES_IN },
  );
  user.refreshToken = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
}

/**
 * Sets the access (15m, path `/`) and refresh (7d, path `/api/v1`) httpOnly
 * cookies (`## Security` §2).
 *
 * @param {import('express').Response} res - The response.
 * @param {{ accessToken: string, refreshToken: string }} tokens - The token pair.
 * @returns {void}
 */
function setAuthCookies(res, tokens) {
  const isProduction = env.NODE_ENV === 'production';
  res.cookie(constants.COOKIE_ACCESS_TOKEN, tokens.accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: constants.COOKIE_ACCESS_MAX_AGE_MS,
    path: '/',
  });
  res.cookie(constants.COOKIE_REFRESH_TOKEN, tokens.refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: constants.COOKIE_REFRESH_MAX_AGE_MS,
    path: '/api/v1',
  });
}

/**
 * Clears both auth cookies.
 *
 * @param {import('express').Response} res - The response.
 * @returns {void}
 */
function clearAuthCookies(res) {
  res.clearCookie(constants.COOKIE_ACCESS_TOKEN, { path: '/' });
  res.clearCookie(constants.COOKIE_REFRESH_TOKEN, { path: '/api/v1' });
}

/**
 * Extracts firstName/lastName from the email local part (§11.4, REQ-090):
 * first segment = firstName, last segment = lastName; a single-segment local
 * part repeats the segment for both (user decision on §11.4 vs REQ-170).
 *
 * @param {string} email - The registration email.
 * @returns {{ firstName: string, lastName: string }} The extracted names.
 */
function extractNamesFromEmail(email) {
  const localPart = email.split('@')[0];
  const segments = localPart.split('.');
  return { firstName: segments[0], lastName: segments[segments.length - 1] };
}

/**
 * Extracts firstName/lastName from the Google profile display name; falls
 * back to the email local part when the name is empty.
 *
 * @param {string} displayName - The Google profile name.
 * @param {string} email - The Google account email.
 * @returns {{ firstName: string, lastName: string }} The extracted names.
 */
function extractNamesFromGoogleProfile(displayName, email) {
  const trimmed = displayName.trim();
  if (!trimmed) {
    return extractNamesFromEmail(email);
  }
  const parts = trimmed.split(' ');
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

/**
 * POST /api/v1/auth/register — account creation with email-local-part name
 * extraction; issues the session cookies on success (REQ-090, REQ-081).
 *
 * @param {import('express').Request} req - The request with `req.validated`.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>} Responds 201 with the created user.
 * @throws {CustomError} CONFLICT when the email is already registered.
 */
const register = asyncHandler(async (req, res) => {
  const { email, password } = req.validated;
  const existing = await User.findOne({ email });
  if (existing) {
    throw new CustomError(CONFLICT, 'Email already in use');
  }
  const { firstName, lastName } = extractNamesFromEmail(email);
  const user = await User.create({ email, password, firstName, lastName });
  const tokens = await issueTokens(user);
  setAuthCookies(res, tokens);
  res.status(CREATED).json({ success: true, message: 'Account created successfully', data: { user } });
});

/**
 * POST /api/v1/auth/login — password verification via the bcrypt compare
 * method, never plaintext comparison (REQ-089); issues the session cookies.
 *
 * @param {import('express').Request} req - The request with `req.validated`.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>} Responds 200 with the user and the cookies.
 * @throws {CustomError} UNAUTHORIZED on unknown email or wrong password.
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validated;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new CustomError(UNAUTHORIZED, 'Invalid email or password');
  }
  const tokens = await issueTokens(user);
  setAuthCookies(res, tokens);
  res.status(OK).json({ success: true, message: 'Login successful', data: { user } });
});

/**
 * POST /api/v1/auth/logout — invalidates the stored refresh token and clears
 * both cookies; idempotent when no refresh cookie is present.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>} Responds 200 with an empty envelope.
 */
const logout = asyncHandler(async (req, res) => {
  const token = req.cookies[constants.COOKIE_REFRESH_TOKEN];
  if (token) {
    try {
      const payload = jwt.verify(token, env.JWT_REFRESH_SECRET);
      const user = await User.findById(payload.id);
      if (user && user.refreshToken) {
        user.refreshToken = null;
        await user.save();
      }
    } catch (error) {
      logger.warn('Logout carried an invalid refresh token', { error: error.message });
    }
  }
  clearAuthCookies(res);
  res.status(OK).json({ success: true, message: 'Logged out successfully', data: {} });
});

/**
 * POST /api/v1/auth/refresh — rotates the refresh token on each use against
 * replay (REQ-087) and re-issues the access + refresh cookies.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>} Responds 200 with re-issued cookies.
 * @throws {CustomError} UNAUTHORIZED on missing, tampered, or replayed tokens.
 */
const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies[constants.COOKIE_REFRESH_TOKEN];
  if (!token) {
    throw new CustomError(UNAUTHORIZED, 'Refresh token missing');
  }
  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET);
  const user = await User.findById(payload.id);
  if (!user || !user.refreshToken || user.refreshToken !== token) {
    clearAuthCookies(res);
    throw new CustomError(UNAUTHORIZED, 'Invalid refresh token');
  }
  const tokens = await issueTokens(user);
  setAuthCookies(res, tokens);
  res.status(OK).json({ success: true, message: 'Session refreshed', data: {} });
});

/**
 * GET /api/v1/auth/me — the authenticated user for the route guards.
 *
 * @param {import('express').Request} req - The request with `req.user`.
 * @param {import('express').Response} res - The response.
 * @returns {import('express').Response} Responds 200 with the user.
 */
const me = asyncHandler(async (req, res) => {
  res.status(OK).json({ success: true, message: 'Authenticated', data: { user: req.user } });
});

/**
 * GET /oauth/google — the Google consent redirect; returns the 503 envelope
 * while the OAUTH_GOOGLE_* credentials are unconfigured (REQ-091).
 *
 * @param {import('express').Request} _req - The request (unused).
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>} Redirects to the consent URL.
 * @throws {CustomError} SERVICE_UNAVAILABLE when credentials are not configured.
 */
const googleOAuthStart = asyncHandler(async (_req, res) => {
  res.redirect(getGoogleOAuthUrl());
});

/**
 * GET /oauth/google/callback — exchanges the authorization code, matches or
 * creates the user by email (REQ-091), issues the session cookies, and
 * redirects back to the client origin.
 *
 * @param {import('express').Request} req - The request with the `code` query.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>} Redirects to the client origin.
 * @throws {CustomError} BAD_REQUEST when the authorization code is missing.
 */
const googleOAuthCallback = asyncHandler(async (req, res) => {
  const { code } = req.query;
  if (!code) {
    throw new CustomError(BAD_REQUEST, 'Authorization code missing');
  }
  try {
    const profile = await exchangeCodeForProfile(code);
    let user = await User.findOne({ email: profile.email });
    if (!user) {
      const { firstName, lastName } = extractNamesFromGoogleProfile(profile.name, profile.email);
      user = await User.create({
        email: profile.email,
        firstName,
        lastName,
        avatar: profile.picture,
        authProvider: 'google',
        password: crypto.randomBytes(OAUTH_RANDOM_PASSWORD_BYTES).toString('hex'),
      });
    }
    const tokens = await issueTokens(user);
    setAuthCookies(res, tokens);
    res.redirect(env.CLIENT_ORIGIN);
  } catch (error) {
    logger.warn('Google OAuth callback failed', { error: error.message });
    res.redirect(`${env.CLIENT_ORIGIN}/login`);
  }
});

export {
  googleOAuthCallback,
  googleOAuthStart,
  login,
  logout,
  me,
  refresh,
  register,
};
