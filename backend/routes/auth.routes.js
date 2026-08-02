/**
 * @module routes/auth
 */

import { Router } from 'express';

import authenticate from '../middleware/authenticate.middleware.js';
import { validateLogin, validateRegister } from '../validators/auth.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'auth routes healthy', data: {} });
});

router.post('/validate', validateRegister, (req, res) => {
  res.status(OK).json({ success: true, message: 'validated', data: { validated: req.validated } });
});

router.get('/protected', authenticate, (req, res) => {
  res.status(OK).json({ success: true, message: 'authenticated', data: { userId: req.user._id.toString() } });
});

export default router;
