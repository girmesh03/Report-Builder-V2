/**
 * @module validators/report.validator
 */

import { body } from 'express-validator';

import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateCreateReport = [
  body('date').trim().notEmpty().withMessage('Report date is required'),
  validate,
];
