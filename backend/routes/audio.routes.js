/**
 * @module routes/audio
 */

import { Router } from 'express';

import authenticate from '../middleware/authenticate.middleware.js';
import { createAudio, getAudio, listAudios } from '../controllers/audio.controller.js';
import { validateAudioId, validateCreateAudio } from '../validators/audio.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'audio routes healthy', data: {} });
});

router.get('/', authenticate, listAudios);
router.get('/:id', authenticate, validateAudioId, getAudio);
router.post('/', authenticate, validateCreateAudio, createAudio);

export default router;
