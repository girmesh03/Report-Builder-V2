/**
 * @module validators/user.validator
 */

import { body } from 'express-validator';

import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateUpdateProfile = [
  body('firstName').optional().isString().withMessage('firstName must be a string'),
  body('lastName').optional().isString().withMessage('lastName must be a string'),
  body('avatar').optional().isString().withMessage('avatar must be a string'),
  body('position').optional().isString().withMessage('position must be a string'),
  validate,
];
