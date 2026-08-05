/**
 * @module validators/transcription.validator
 */

import { body, param } from 'express-validator';

import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateCreateTranscription = [
  body('reportId').isMongoId().withMessage('reportId must reference a valid report'),
  body('raw').isString().withMessage('raw transcription must be a string'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateUpdateTranscription = [
  param('id').isMongoId().withMessage('Invalid transcription id'),
  body('reviewed').trim().notEmpty().withMessage('Reviewed transcription is required'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateTranscriptionId = [
  param('id').isMongoId().withMessage('Invalid transcription id'),
  validate,
];

/**
 * Report-id parameter for `POST /api/v1/reports/:id/transcribe`
 * (`## API Contract` §6.2, T-4-04).
 *
 * @type {import('express-validator').ValidationChain[]}
 */
export const validateTranscribeReportId = [
  param('id').isMongoId().withMessage('Invalid report id'),
  validate,
];
