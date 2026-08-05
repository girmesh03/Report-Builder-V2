/**
 * @module middleware/error
 */

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import env from '../config/env.js';
import constants from '../utils/constants.js';
import { CustomError } from '../utils/error.js';
import logger from '../utils/logger.js';
import {
  BAD_REQUEST,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} from '../utils/httpStatus.js';

/**
 * Global error handler: operational CustomError → statusCode + envelope;
 * Mongoose and JWT error classes map to the §28.2 table statuses; unexpected
 * errors are logged and get a generic production message.
 *
 * @param {import('express').ErrorRequestHandler} err - The forwarded error.
 * @param {import('express').Request} _req - Request (unused).
 * @param {import('express').Response} res - Response.
 * @param {import('express').NextFunction} next - Next; forwards errors raised after the headers were already sent (e.g. stream errors, F-4-09) so Express destroys the connection instead of attempting a second response.
 * @returns {import('express').Response | void} The JSON error response.
 */
const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof CustomError && err.isOperational) {
    return res.status(err.statusCode).json({ success: false, message: err.message, data: {} });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(BAD_REQUEST).json({ success: false, message: err.message, data: {} });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(UNPROCESSABLE_ENTITY).json({ success: false, message: err.message, data: {} });
  }
  if (err.code === constants.MONGOOSE_DUPLICATE_KEY_ERROR_CODE) {
    return res.status(CONFLICT).json({ success: false, message: err.message, data: {} });
  }
  if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
    return res.status(UNAUTHORIZED).json({ success: false, message: err.message, data: {} });
  }
  logger.error('Unexpected error', { stack: err.stack, statusCode: err.statusCode });
  if (env.NODE_ENV === 'development') {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message, data: { stack: err.stack } });
  }
  return res
    .status(INTERNAL_SERVER_ERROR)
    .json({ success: false, message: 'Something went wrong', data: {} });
};

export default errorHandler;
