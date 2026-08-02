/**
 * @module routes/user
 */

import { Router } from 'express';

import { validateUpdateProfile } from '../validators/user.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'user routes healthy', data: {} });
});

router.post('/validate', validateUpdateProfile, (req, res) => {
  res.status(OK).json({ success: true, message: 'validated', data: { validated: req.validated } });
});

export default router;
