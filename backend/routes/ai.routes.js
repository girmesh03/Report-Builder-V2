/**
 * @module routes/ai
 */

import { Router } from 'express';

import { validateGeneration } from '../validators/ai.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'ai routes healthy', data: {} });
});

router.post('/validate', validateGeneration, (req, res) => {
  res.status(OK).json({ success: true, message: 'validated', data: { validated: req.validated } });
});

export default router;
