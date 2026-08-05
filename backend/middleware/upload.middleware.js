/**
 * @module middleware/upload
 */

import { mkdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

import multer from 'multer';

import constants from '../utils/constants.js';
import { CustomError } from '../utils/error.js';
import {
  BAD_REQUEST,
  PAYLOAD_TOO_LARGE,
  UNSUPPORTED_MEDIA_TYPE,
} from '../utils/httpStatus.js';

/**
 * Absolute audio-upload directory, anchored to this file (the same
 * CWD-independent resolution `config/env.js` uses for `backend/.env`) —
 * `backend/uploads/audio/`, gitignored and never committed
 * (`## Audio Recording STT` §7).
 *
 * @type {string}
 */
const UPLOADS_AUDIO_DIR = fileURLToPath(new URL('../uploads/audio/', import.meta.url));

mkdirSync(UPLOADS_AUDIO_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_AUDIO_DIR),
  filename: (_req, _file, cb) => cb(null, `${randomUUID()}.webm`),
});

/**
 * Multer file filter: only the frozen `AUDIO_ALLOWED_MIME_TYPES` whitelist
 * passes; everything else is rejected with a 415 CustomError that the
 * wrapper below maps to the §10.7 envelope (`## Error Handling` §2, REQ-142).
 *
 * @param {import('express').Request} _req - Request (unused).
 * @param {import('multer').File} file - The incoming file.
 * @param {import('multer').FileFilterCallback} cb - Multer callback.
 * @returns {void}
 */
const fileFilter = (_req, file, cb) => {
  if (!constants.AUDIO_ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new CustomError(UNSUPPORTED_MEDIA_TYPE, 'Unsupported audio type'));
  }
  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: constants.AUDIO_MAX_SIZE_BYTES,
    files: constants.UPLOAD_MAX_FILES_PER_REQUEST,
  },
});

/**
 * Multer receiver for the `clips` multipart field (max 10 files,
 * `## API Contract` §6.1): stores each clip as `{uuid}.webm` under
 * `backend/uploads/audio/` (T-4-01a). Multer errors and fileFilter
 * rejections are mapped here to the §10.7 envelope — `LIMIT_FILE_SIZE` →
 * 413, MIME rejection → 415 (`## Error Handling` §2); anything else
 * forwards to the global error handler.
 *
 * @param {import('express').Request} req - Request; gains `req.files`.
 * @param {import('express').Response} res - Response.
 * @param {import('express').NextFunction} next - Next.
 * @returns {void}
 */
const uploadAudioClips = (req, res, next) => {
  upload.array('clips', constants.UPLOAD_MAX_FILES_PER_REQUEST)(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(PAYLOAD_TOO_LARGE).json({
          success: false,
          message: 'File size exceeds the maximum allowed',
          data: {},
        });
      }
      return res.status(BAD_REQUEST).json({
        success: false,
        message: error.code === 'LIMIT_UNEXPECTED_FILE' ? 'Unexpected form field' : 'File upload failed',
        data: {},
      });
    }
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ success: false, message: error.message, data: {} });
    }
    return next(error);
  });
};

export { uploadAudioClips, UPLOADS_AUDIO_DIR };
