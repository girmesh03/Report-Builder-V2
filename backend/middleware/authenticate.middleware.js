/**
 * @module middleware/authenticate
 */

import jwt from 'jsonwebtoken';

import env from '../config/env.js';
import User from '../models/user.model.js';
import { CustomError } from '../utils/error.js';
import { UNAUTHORIZED } from '../utils/httpStatus.js';

/**
 * JWT verification for protected routes (§11): extracts the token from
 * `req.cookies.accessToken`, verifies it, loads the user document, and
 * attaches it to `req.user`. Missing or invalid tokens forward a 401 error;
 * JWT errors are mapped by the global error handler.
 *
 * @param {import('express').Request} req - Request; gains `req.user`.
 * @param {import('express').Response} _res - Response (unused).
 * @param {import('express').NextFunction} next - Next.
 * @returns {Promise<void>}
 */
const authenticate = async (req, _res, next) => {
  try {
    const token = req.cookies && req.cookies.accessToken;
    if (!token) {
      return next(new CustomError(UNAUTHORIZED, 'Authentication required'));
    }
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
    const user = await User.findById(payload.id);
    if (!user) {
      return next(new CustomError(UNAUTHORIZED, 'User not found'));
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default authenticate;
