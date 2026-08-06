/**
 * @module validators/ai.validator
 */

import { body, param } from 'express-validator';

import constants from '../utils/constants.js';
import { validate } from './validation.js';

/** @type {import('express-validator').ValidationChain[]} */
export const validateGeneration = [
  body('provider').optional().isIn(['addis', 'gemini', 'nvidia']).withMessage('Provider must be addis, gemini, or nvidia'),
  body('reasoning').optional().isBoolean().withMessage('reasoning must be a boolean'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateCreateConversation = [
  body('reportId').optional({ values: 'falsy' }).isMongoId().withMessage('reportId must reference a valid report'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateConversationId = [param('id').isMongoId().withMessage('Invalid conversation id'), validate];

/** @type {import('express-validator').ValidationChain[]} */
export const validateMessageId = [
  param('messageId').isString().notEmpty().withMessage('messageId is required'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateRegenerate = [
  param('id').isMongoId().withMessage('Invalid conversation id'),
  param('messageId').isString().notEmpty().withMessage('messageId is required'),
  body('provider')
    .optional()
    .isIn([constants.PROVIDER_ADDIS, constants.PROVIDER_GEMINI, constants.PROVIDER_NVIDIA])
    .withMessage('Provider must be addis, gemini, or nvidia'),
  body('reasoning').optional().isBoolean().withMessage('reasoning must be a boolean'),
  body('tool')
    .optional()
    .isIn([constants.ASSISTANT_TOOL_SAVE_REPORT, constants.ASSISTANT_TOOL_SAVE_TRANSCRIPTION])
    .withMessage('tool must be save_report or save_transcription'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateSendMessage = [
  param('id').isMongoId().withMessage('Invalid conversation id'),
  body('content').trim().notEmpty().withMessage('Message content is required'),
  body('provider')
    .optional()
    .isIn([constants.PROVIDER_ADDIS, constants.PROVIDER_GEMINI, constants.PROVIDER_NVIDIA])
    .withMessage('Provider must be addis, gemini, or nvidia'),
  body('reasoning').optional().isBoolean().withMessage('reasoning must be a boolean'),
  body('tool')
    .optional()
    .isIn([constants.ASSISTANT_TOOL_SAVE_REPORT, constants.ASSISTANT_TOOL_SAVE_TRANSCRIPTION])
    .withMessage('tool must be save_report or save_transcription'),
  validate,
];

/** @type {import('express-validator').ValidationChain[]} */
export const validateToolApproval = [
  param('toolCallId').isString().notEmpty().withMessage('toolCallId is required'),
  body('approved').isBoolean().withMessage('approved must be a boolean'),
  body('reason').optional({ values: 'falsy' }).isString().withMessage('reason must be a string'),
  validate,
];