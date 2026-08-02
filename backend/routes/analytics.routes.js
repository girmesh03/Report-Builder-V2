/**
 * @module routes/analytics
 */

import { Router } from 'express';

import { validateList } from '../validators/analytics.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'analytics routes healthy', data: {} });
});

router.get('/validate', validateList, (req, res) => {
  res.status(OK).json({ success: true, message: 'validated', data: { validated: req.validated } });
});

export default router;
