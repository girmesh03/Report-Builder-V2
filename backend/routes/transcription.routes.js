/**
 * @module routes/transcription
 */

import { Router } from 'express';

import { validateCorrection } from '../validators/transcription.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'transcription routes healthy', data: {} });
});

router.post('/validate', validateCorrection, (req, res) => {
  res.status(OK).json({ success: true, message: 'validated', data: { validated: req.validated } });
});

export default router;
