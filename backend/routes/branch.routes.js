/**
 * @module routes/branch
 */

import { Router } from 'express';

import { validateCreateBranch } from '../validators/branch.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'branch routes healthy', data: {} });
});

router.post('/validate', validateCreateBranch, (req, res) => {
  res.status(OK).json({ success: true, message: 'validated', data: { validated: req.validated } });
});

export default router;
