/**
 * @module routes/auth
 */

import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';

import constants from '../utils/constants.js';
import authenticate from '../middleware/authenticate.middleware.js';
import { login, logout, me, refresh, register } from '../controllers/auth.controller.js';
import { validateLogin, validateRegister } from '../validators/auth.validator.js';
import { OK } from '../utils/httpStatus.js';

const authLimiter = rateLimit({
  windowMs: constants.RATE_LIMIT_AUTH_WINDOW_MS,
  max: constants.RATE_LIMIT_AUTH_MAX,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
    data: {},
  },
});

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'auth routes healthy', data: {} });
});

router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);
router.post('/logout', logout);
router.post('/refresh', refresh);
router.get('/me', authenticate, me);

export default router;
