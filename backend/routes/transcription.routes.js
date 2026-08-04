/**
 * @module routes/transcription
 */

import { Router } from 'express';

import authenticate from '../middleware/authenticate.middleware.js';
import {
  createTranscription,
  getTranscription,
  listTranscriptions,
  updateTranscription,
} from '../controllers/transcription.controller.js';
import {
  validateCreateTranscription,
  validateTranscriptionId,
  validateUpdateTranscription,
} from '../validators/transcription.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'transcription routes healthy', data: {} });
});

router.get('/', authenticate, listTranscriptions);
router.get('/:id', authenticate, validateTranscriptionId, getTranscription);
router.post('/', authenticate, validateCreateTranscription, createTranscription);
router.patch('/:id', authenticate, validateUpdateTranscription, updateTranscription);

export default router;
