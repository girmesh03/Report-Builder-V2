/**
 * @module routes/report
 */

import { Router } from 'express';

import { validateCreateReport } from '../validators/report.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'report routes healthy', data: {} });
});

router.post('/validate', validateCreateReport, (req, res) => {
  res.status(OK).json({ success: true, message: 'validated', data: { validated: req.validated } });
});

export default router;
