/**
 * @module routes/branch
 */

import { Router } from 'express';

import authenticate from '../middleware/authenticate.middleware.js';
import {
  createBranch,
  deleteBranch,
  getBranch,
  listBranches,
  updateBranch,
} from '../controllers/branch.controller.js';
import {
  validateBranchId,
  validateCreateBranch,
  validateUpdateBranch,
} from '../validators/branch.validator.js';
import { OK } from '../utils/httpStatus.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'branch routes healthy', data: {} });
});

router.get('/', authenticate, listBranches);
router.get('/:id', authenticate, validateBranchId, getBranch);
router.post('/', authenticate, validateCreateBranch, createBranch);
router.put('/:id', authenticate, validateUpdateBranch, updateBranch);
router.delete('/:id', authenticate, validateBranchId, deleteBranch);

export default router;
