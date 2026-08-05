/**
 * @module validators/audio.validator
 */

import { body, param } from 'express-validator';

import { validate } from './validation.js';

/**
 * Multipart audio-upload validation (T-4-01c, `## API Contract` §6): the
 * clips themselves are validated by multer (MIME whitelist + 50 MB cap,
 * `## Audio Recording STT` §6) and the reportId form field here — the MIME
 * whitelist and size caps of `## Audio Recording STT` §2 are enforced by
 * `middleware/upload.middleware.js`, keeping the §10.7 envelope and 422
 * shape for express-validator failures (REQ-142, REQ-143).
 *
 * @type {import('express-validator').ValidationChain[]}
 */
export const validateAudioUpload = [
  body('reportId').isMongoId().withMessage('reportId must reference a valid report'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateAudioId = [param('id').isMongoId().withMessage('Invalid audio id'), validate];
