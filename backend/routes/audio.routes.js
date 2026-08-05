/**
 * @module routes/audio
 */

import { Router } from 'express';

import authenticate from '../middleware/authenticate.middleware.js';
import { uploadAudioClips as receiveUpload } from '../middleware/upload.middleware.js';
import {
  downloadAudio,
  getAudio,
  listAudios,
  streamAudio,
  uploadAudioClips,
} from '../controllers/audio.controller.js';
import { validateAudioId, validateAudioUpload } from '../validators/audio.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'audio routes healthy', data: {} });
});

router.get('/', authenticate, listAudios);
router.get('/:id/stream', authenticate, validateAudioId, streamAudio);
router.get('/:id/download', authenticate, validateAudioId, downloadAudio);
router.get('/:id', authenticate, validateAudioId, getAudio);
router.post('/', authenticate, receiveUpload, validateAudioUpload, uploadAudioClips);

export default router;
