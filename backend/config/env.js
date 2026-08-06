/**
 * @module config/env
 * @description Frozen, validated environment configuration. The sole
 * `process.env` access point of the backend (REQ-083); every required key of
 * `## Environment Config` §2 is validated at startup and defaults from the
 * §2 table are applied where the source allows (REQ-121). Missing required
 * variables or JWT secrets shorter than 32 characters fail startup with a
 * clear error. FFMPEG_PATH/FFPROBE_PATH must resolve to existing binaries
 * (Phase 4 corrections): placeholder paths used to fail later as a cryptic
 * 422 `Audio file could not be validated` on the upload endpoint.
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

import { execFileSync } from 'node:child_process';
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
  NVIDIA_API_BASE_URL:
    process.env.NVIDIA_API_BASE_URL && process.env.NVIDIA_API_BASE_URL !== 'change me'
      ? process.env.NVIDIA_API_BASE_URL
      : 'https://integrate.api.nvidia.com/v1',
  GEMINI_API_BASE_URL:
    process.env.GEMINI_API_BASE_URL && process.env.GEMINI_API_BASE_URL !== 'change me'
      ? process.env.GEMINI_API_BASE_URL
      : 'https://generativelanguage.googleapis.com/v1beta',
  FFMPEG_PATH: process.env.FFMPEG_PATH || 'ffmpeg',
  FFPROBE_PATH: process.env.FFPROBE_PATH || 'ffprobe',
  // Optional model overrides: let the deployment point the providers at a
  // reasoning-capable variant (e.g. `deepseek-ai/deepseek-v4-flash`) without
  // a code change. Non-required keys — they fall back to the frozen
  // `constants.GEMINI_MODEL`/`NVIDIA_MODEL` in the services.
  GEMINI_MODEL: process.env.GEMINI_MODEL && process.env.GEMINI_MODEL !== 'change me' ? process.env.GEMINI_MODEL : undefined,
  NVIDIA_MODEL:
    process.env.NVIDIA_MODEL && process.env.NVIDIA_MODEL !== 'change me' ? process.env.NVIDIA_MODEL : undefined,
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

const PLACEHOLDER_PATTERNS = [/change\s?me/i, /your[-_]?\w*-?key/i, /<[^>]+>/];
const placeholderKeys = [
  'ADDIS_AI_API_KEY',
  'ADDIS_AI_TEXT_MODEL',
  'ADDIS_AI_STT_MODEL',
  'NVIDIA_API_KEY',
  'GEMINI_API_KEY',
  'NVIDIA_API_BASE_URL',
  'GEMINI_API_BASE_URL',
].filter((key) => env[key] && PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(String(env[key]))));
if (placeholderKeys.length > 0) {
  throw new Error(
    `Provider placeholder values in backend/.env (phase-5: a downloaded .env template with "change me" keys silently fell back to Addis, breaking provider selection): ${placeholderKeys.join(
      ', ',
    )}. Set real values in backend/.env.`,
  );
}

if (env.JWT_ACCESS_SECRET.length < JWT_SECRET_MIN_LENGTH) {
  throw new Error('JWT_ACCESS_SECRET must be at least 32 characters long');
}
if (env.JWT_REFRESH_SECRET.length < JWT_SECRET_MIN_LENGTH) {
  throw new Error('JWT_REFRESH_SECRET must be at least 32 characters long');
}

for (const key of ['FFMPEG_PATH', 'FFPROBE_PATH']) {
  const binaryPath = env[key];
  // Resolve the binary the way it is actually invoked: `execFile`/`execFileSync`
  // search PATH (and PATHEXT on Windows), while `existsSync` never does — the
  // documented system-path defaults `'ffmpeg'`/`'ffprobe'` resolve through
  // PATH and must keep working (F-4-04). `-version` exits 0 for either binary;
  // a genuinely missing executable throws, failing startup loudly instead of a
  // cryptic 422 at upload time (Phase 4 corrections).
  try {
    execFileSync(binaryPath, ['-version'], { stdio: 'ignore' });
  } catch {
    throw new Error(
      `${key} points to a missing binary: "${binaryPath}". Set it to an existing ffmpeg/ffprobe executable in backend/.env (Phase 4 corrections — fail-fast instead of a cryptic 422 at upload time).`,
    );
  }
}

export default Object.freeze(env);
