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
  removeStoredClips,
  streamAudio,
  uploadAudioClips,
} from '../controllers/audio.controller.js';
import { validateAudioId, validateAudioUpload } from '../validators/audio.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

/**
 * Cleans up multer-stored clip files when a later validator rejects the
 * request (F-4-06): `validateAudioUpload` answers 422 directly from the
 * validator chain (e.g. a malformed `reportId`), so the controller — whose
 * catch removes the files — never runs, and multer only cleans its own
 * errors. The `'finish'` listener unlinks `req.files` whenever the merged
 * pipeline ends on a non-2xx status unless the controller already initiated
 * cleanup (`req.cleanedUploads`), avoiding a double-unlink of its own
 * 422s.
 *
 * @param {import('express').Request} req - The request; carries `req.files` once multer ran.
 * @param {import('express').Response} res - The response.
 * @param {import('express').NextFunction} next - Next.
 * @returns {void}
 */
function cleanupUploadedOnFailure(req, res, next) {
  res.on('finish', () => {
    if (res.statusCode >= 400 && !req.cleanedUploads) {
      removeStoredClips(req.files ?? []);
    }
  });
  next();
}

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'audio routes healthy', data: {} });
});

router.get('/', authenticate, listAudios);
router.get('/:id/stream', authenticate, validateAudioId, streamAudio);
router.get('/:id/download', authenticate, validateAudioId, downloadAudio);
router.get('/:id', authenticate, validateAudioId, getAudio);
router.post('/', authenticate, receiveUpload, cleanupUploadedOnFailure, validateAudioUpload, uploadAudioClips);

export default router;
