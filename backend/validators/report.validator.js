/**
 * @module validators/report.validator
 */

import { body, param } from 'express-validator';

import constants from '../utils/constants.js';
import { validate } from './validation.js';

/** @type {RegExp} DD-MM-YYYY display value, e.g. "30-07-2026" (`## Data Modeling` §4.1). */
const REPORT_DATE_PATTERN = /^\d{2}-\d{2}-\d{4}$/;

/** @type {RegExp} 12-hour time string, e.g. "02:30 PM" (`## Data Modeling` §4.1). */
const REPORT_TIME_PATTERN = /^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i;

/**
 * Shared report metadata rules — used by create and update validators so the
 * contracts stay in lockstep (`## API Contract` §8: date, branches[],
 * clockIn, clockOut).
 *
 * @type {import('express-validator').ValidationChain[]}
 */
const reportBodyRules = [
  body('date')
    .trim()
    .notEmpty()
    .withMessage('Report date is required')
    .matches(REPORT_DATE_PATTERN)
    .withMessage('Report date must be in DD-MM-YYYY format'),
  body('branches')
    .isArray({ min: 1 })
    .withMessage('At least one branch required'),
  body('branches.*.branchId').isMongoId().withMessage('Each branch must reference a valid branch'),
  body('branches.*.clockIn')
    .optional({ values: 'falsy' })
    .matches(REPORT_TIME_PATTERN)
    .withMessage('Branch clock-in must be a 12-hour time like 02:30 PM'),
  body('branches.*.clockOut')
    .optional({ values: 'falsy' })
    .matches(REPORT_TIME_PATTERN)
    .withMessage('Branch clock-out must be a 12-hour time like 02:30 PM'),
  body('clockIn')
    .optional({ values: 'falsy' })
    .matches(REPORT_TIME_PATTERN)
    .withMessage('Clock-in must be a 12-hour time like 02:30 PM'),
  body('clockOut')
    .optional({ values: 'falsy' })
    .matches(REPORT_TIME_PATTERN)
    .withMessage('Clock-out must be a 12-hour time like 02:30 PM'),
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateCreateReport = [...reportBodyRules, validate];

/** @type {import('express-validator').ValidationChain[]} */
export const validateUpdateReport = [
  param('id').isMongoId().withMessage('Invalid report id'),
  ...reportBodyRules.map((rule) => rule.optional({ values: 'undefined' })),
  body('generated').optional({ values: 'falsy' }).isString().withMessage('Generated report must be a string'),
  body('provider')
    .optional({ values: 'falsy' })
    .isIn([constants.PROVIDER_ADDIS, constants.PROVIDER_GEMINI, constants.PROVIDER_NVIDIA])
    .withMessage('Provider must be addis, gemini, or nvidia'),
  body('provider')
    .if((value) => value !== undefined)
    .custom((value, { req }) => req.body.generated !== undefined)
    .withMessage('Provider is only accepted together with generated text'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateReportId = [param('id').isMongoId().withMessage('Invalid report id'), validate];
