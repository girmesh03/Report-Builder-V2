/**
 * @module validators/audio.validator
 */

import { body, param } from 'express-validator';

import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateCreateAudio = [
  body('reportId').isMongoId().withMessage('reportId must reference a valid report'),
  body('originalName').trim().notEmpty().withMessage('originalName is required'),
  body('mimeType').trim().notEmpty().withMessage('mimeType is required'),
  body('fileSize').isInt({ min: 0 }).withMessage('fileSize must be a non-negative number'),
  body('duration').isFloat({ min: 0 }).withMessage('duration must be a non-negative number'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateAudioId = [param('id').isMongoId().withMessage('Invalid audio id'), validate];
