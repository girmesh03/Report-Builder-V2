/**
 * @module config/env
 * @description Frozen, validated environment configuration. The sole
 * `process.env` access point of the backend (REQ-083); every required key of
 * `## Environment Config` §2 is validated at startup and defaults from the
 * §2 table are applied where the source allows (REQ-121). Missing required
 * variables or JWT secrets shorter than 32 characters fail startup with a
 * clear error.
 *
 * Loads `backend/.env` here, resolved by an absolute path anchored to this
 * file (Phase 3 corrections — dotenv hardening): the previous CWD-dependent
 * `import 'dotenv/config'` in `server.js` resolved `.env` relative to the
 * launch directory, so a backend started from any other directory silently
 * used a different env (or none) — a JWT secret mismatch between two such
 * starts signs tokens with secrets the other instance rejects, kicking every
 * session (`invalid signature` on `/auth/refresh`). This module runs before
 * every consumer because `server.js`/`app.js` import it first.
 */

import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';

loadEnv({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const REQUIRED_KEYS = [
  'NODE_ENV',
  'PORT',
  'CLIENT_ORIGIN',
  'MONGODB_URI',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'JWT_ACCESS_EXPIRES_IN',
  'JWT_REFRESH_EXPIRES_IN',
  'ADDIS_AI_BASE_URL',
  'ADDIS_AI_API_KEY',
  'ADDIS_AI_TEXT_MODEL',
  'ADDIS_AI_STT_MODEL',
  'ADDIS_AI_DEFAULT_TARGET_LANGUAGE',
  'ADDIS_AI_STT_LANGUAGE_CODE',
  'ADDIS_AI_TIMEOUT_MS',
  'LOG_LEVEL',
  'NVIDIA_API_KEY',
  'GEMINI_API_KEY',
  'NVIDIA_API_BASE_URL',
  'GEMINI_API_BASE_URL',
  'FFMPEG_PATH',
  'FFPROBE_PATH',
];

const JWT_SECRET_MIN_LENGTH = 32;

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 4000,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  ADDIS_AI_BASE_URL: process.env.ADDIS_AI_BASE_URL || 'https://api.addisassistant.com',
  ADDIS_AI_API_KEY: process.env.ADDIS_AI_API_KEY,
  ADDIS_AI_TEXT_MODEL: process.env.ADDIS_AI_TEXT_MODEL || 'Addis-፩-አሌፍ',
  ADDIS_AI_STT_MODEL: process.env.ADDIS_AI_STT_MODEL || 'default',
  ADDIS_AI_DEFAULT_TARGET_LANGUAGE: process.env.ADDIS_AI_DEFAULT_TARGET_LANGUAGE || 'am',
  ADDIS_AI_STT_LANGUAGE_CODE: process.env.ADDIS_AI_STT_LANGUAGE_CODE || 'am',
  ADDIS_AI_TIMEOUT_MS: Number(process.env.ADDIS_AI_TIMEOUT_MS) || 360000,
  LOG_LEVEL: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  NVIDIA_API_KEY: process.env.NVIDIA_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  NVIDIA_API_BASE_URL: process.env.NVIDIA_API_BASE_URL,
  GEMINI_API_BASE_URL: process.env.GEMINI_API_BASE_URL,
  FFMPEG_PATH: process.env.FFMPEG_PATH || 'ffmpeg',
  FFPROBE_PATH: process.env.FFPROBE_PATH || 'ffprobe',
};

if (process.env.OAUTH_GOOGLE_CLIENT_ID) {
  env.OAUTH_GOOGLE_CLIENT_ID = process.env.OAUTH_GOOGLE_CLIENT_ID;
}
if (process.env.OAUTH_GOOGLE_CLIENT_SECRET) {
  env.OAUTH_GOOGLE_CLIENT_SECRET = process.env.OAUTH_GOOGLE_CLIENT_SECRET;
}
if (process.env.OAUTH_GOOGLE_CALLBACK_URL) {
  env.OAUTH_GOOGLE_CALLBACK_URL = process.env.OAUTH_GOOGLE_CALLBACK_URL;
}

const missingKeys = REQUIRED_KEYS.filter((key) => !env[key]);
if (missingKeys.length > 0) {
  throw new Error(`Missing required environment variables: ${missingKeys.join(', ')}`);
}

if (env.JWT_ACCESS_SECRET.length < JWT_SECRET_MIN_LENGTH) {
  throw new Error('JWT_ACCESS_SECRET must be at least 32 characters long');
}
if (env.JWT_REFRESH_SECRET.length < JWT_SECRET_MIN_LENGTH) {
  throw new Error('JWT_REFRESH_SECRET must be at least 32 characters long');
}

export default Object.freeze(env);
