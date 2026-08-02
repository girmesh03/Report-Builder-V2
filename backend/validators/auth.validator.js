/**
 * @module validators/auth.validator
 */

import { body } from 'express-validator';

import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateRegister = [
  body('email')
    .trim()
    .normalizeEmail({ gmail_remove_dots: false })
    .isEmail()
    .withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateLogin = [
  body('email')
    .trim()
    .normalizeEmail({ gmail_remove_dots: false })
    .isEmail()
    .withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];
