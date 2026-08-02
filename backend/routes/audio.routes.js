/**
 * @module routes/audio
 */

import { Router } from 'express';

import { validateClipMetadata } from '../validators/audio.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'audio routes healthy', data: {} });
});

router.post('/validate', validateClipMetadata, (req, res) => {
  res.status(OK).json({ success: true, message: 'validated', data: { validated: req.validated } });
});

export default router;
