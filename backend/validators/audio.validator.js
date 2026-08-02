/**
 * @module validators/audio.validator
 */

import { body } from 'express-validator';

import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateClipMetadata = [
  body('originalName').trim().notEmpty().withMessage('originalName is required'),
  validate,
];
