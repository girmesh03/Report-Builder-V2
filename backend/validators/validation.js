/**
 * @module validators/validation
 */

import { matchedData, validationResult } from 'express-validator';

import { UNPROCESSABLE_ENTITY } from '../utils/httpStatus.js';

/**
 * Checks `express-validator` results (REQ-198): on failure returns 422 with
 * `{ success: false, message: 'Validation failed', data: { errors } }` where
 * each error carries `{ field, message }`; on success attaches
 * `req.validated` (matchedData) and calls next.
 *
 * @param {import('express').Request} req - The request; gains `req.validated`.
 * @param {import('express').Response} res - The response.
 * @param {import('express').NextFunction} next - Next.
 * @returns {import('express').Response | void} The 422 response or next.
 */
export function validate(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array().map((error) => ({ field: error.path, message: error.msg }));
    return res.status(UNPROCESSABLE_ENTITY).json({
      success: false,
      message: 'Validation failed',
      data: { errors },
    });
  }
  req.validated = matchedData(req);
  return next();
}
