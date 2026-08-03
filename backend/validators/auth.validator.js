/**
 * @module validators/auth.validator
 */

import { body } from 'express-validator';

import constants from '../utils/constants.js';
import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateRegister = [
  body('email')
    .trim()
    .normalizeEmail({ gmail_remove_dots: false })
    .isEmail()
    .withMessage('A valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: constants.PASSWORD_MIN_LENGTH })
    .withMessage('At least 6 characters'),
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
