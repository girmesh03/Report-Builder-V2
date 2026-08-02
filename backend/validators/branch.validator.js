/**
 * @module validators/branch.validator
 */

import { body } from 'express-validator';

import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateCreateBranch = [
  body('name').trim().notEmpty().withMessage('Branch name is required'),
  validate,
];
