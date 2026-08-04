/**
 * @module routes/report
 */

import { Router } from 'express';

import authenticate from '../middleware/authenticate.middleware.js';
import {
  createReport,
  deleteReport,
  getReport,
  listReports,
  updateReport,
} from '../controllers/report.controller.js';
import {
  validateCreateReport,
  validateReportId,
  validateUpdateReport,
} from '../validators/report.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'report routes healthy', data: {} });
});

router.get('/', authenticate, listReports);
router.get('/:id', authenticate, validateReportId, getReport);
router.post('/', authenticate, validateCreateReport, createReport);
router.put('/:id', authenticate, validateUpdateReport, updateReport);
router.delete('/:id', authenticate, validateReportId, deleteReport);

export default router;
