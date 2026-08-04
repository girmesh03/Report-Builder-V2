/**
 * @module validators/branch.validator
 */

import { body, param } from 'express-validator';

import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateCreateBranch = [
  body('name').trim().notEmpty().withMessage('Branch name is required'),
  body('location').optional({ values: 'falsy' }).isString().withMessage('Location must be a string'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateUpdateBranch = [
  param('id').isMongoId().withMessage('Invalid branch id'),
  body('name').optional().trim().notEmpty().withMessage('Branch name cannot be empty'),
  body('location').optional({ values: 'falsy' }).isString().withMessage('Location must be a string'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateBranchId = [param('id').isMongoId().withMessage('Invalid branch id'), validate];
