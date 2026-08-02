/**
 * @module validators/ai.validator
 */

import { body } from 'express-validator';

import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateGeneration = [
  body('provider').optional().isIn(['addis', 'gemini', 'nvidia']).withMessage('Provider must be addis, gemini, or nvidia'),
  validate,
];
