/**
 * @module validators/analytics.validator
 */

import { query } from 'express-validator';

import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateList = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('limit must be a positive integer'),
  validate,
];
