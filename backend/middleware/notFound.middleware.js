/**
 * @module middleware/notFound
 */

import { CustomError } from '../utils/error.js';
import { NOT_FOUND } from '../utils/httpStatus.js';

/**
 * Unmatched routes → CustomError(404) → next(); never responds directly.
 *
 * @param {import('express').Request} _req - Request (unused).
 * @param {import('express').Response} _res - Response (unused).
 * @param {import('express').NextFunction} next - Next; receives the error.
 */
const notFound = (_req, _res, next) => {
  next(new CustomError(NOT_FOUND, 'Resource not found'));
};

export default notFound;
