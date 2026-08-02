/**
 * @module validators/transcription.validator
 */

import { body } from 'express-validator';

import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateCorrection = [
  body('reviewed').optional().isString().withMessage('reviewed must be a string'),
  body('instruction').optional().isString().withMessage('instruction must be a string'),
  validate,
];
