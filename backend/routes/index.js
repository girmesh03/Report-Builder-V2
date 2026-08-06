/**
 * @module routes/index
 */

import { Router } from 'express';

import authRoutes from './auth.routes.js';
import branchRoutes from './branch.routes.js';
import reportRoutes from './report.routes.js';
import audioRoutes from './audio.routes.js';
import transcriptionRoutes from './transcription.routes.js';
import aiRoutes from './ai.routes.js';
import assistantRoutes from './assistant.routes.js';
import userRoutes from './user.routes.js';
import analyticsRoutes from './analytics.routes.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'API healthy', data: {} });
});

router.use('/auth', authRoutes);
router.use('/branches', branchRoutes);
router.use('/reports', reportRoutes);
router.use('/audio', audioRoutes);
router.use('/transcriptions', transcriptionRoutes);
router.use('/ai', aiRoutes);
router.use('/assistant', assistantRoutes);
router.use('/user', userRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
