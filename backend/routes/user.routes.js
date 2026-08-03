/**
 * @module routes/user
 */

import { Router } from 'express';

import authenticate from '../middleware/authenticate.middleware.js';
import { getProfile, updateProfile } from '../controllers/user.controller.js';
import { validateUpdateProfile } from '../validators/user.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'user routes healthy', data: {} });
});

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validateUpdateProfile, updateProfile);

export default router;
