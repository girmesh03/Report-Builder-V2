/**
 * @module controllers/branch
 */

import asyncHandler from 'express-async-handler';

import Branch from '../models/branch.model.js';
import constants from '../utils/constants.js';
import { CustomError } from '../utils/error.js';
import { CONFLICT, CREATED, NOT_FOUND, OK } from '../utils/httpStatus.js';

/**
 * Lists the authenticated user's branches — paginated, sorted by name,
 * active-only by default (`## API Contract` §8: `{ user: 1, name: 1 }`);
 * an optional `search` term filters by name.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const listBranches = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || constants.PAGINATION_DEFAULT_PAGE;
  const limit = Math.min(Number(req.query.limit) || constants.PAGINATION_DEFAULT_LIMIT, constants.PAGINATION_MAX_LIMIT);
  const query = { user: req.user._id, isArchived: false };
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
  }
  const result = await Branch.paginate(query, { page, limit, sort: { name: 1 } });
  res.status(OK).json({
    success: true,
    message: 'Branches retrieved',
    data: result,
  });
});

/**
 * Returns a single branch owned by the authenticated user.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const getBranch = asyncHandler(async (req, res) => {
  const branch = await Branch.findOne({ _id: req.params.id, user: req.user._id });
  if (!branch) {
    throw new CustomError(NOT_FOUND, 'Branch not found');
  }
  res.status(OK).json({ success: true, message: 'Branch retrieved', data: { branch } });
});

/**
 * Creates a branch for the authenticated user (`## Report Management` §4).
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const createBranch = asyncHandler(async (req, res) => {
  const { name, location } = req.validated.body;
  const branch = await Branch.create({ name, location, user: req.user._id });
  res.status(CREATED).json({ success: true, message: 'Branch created', data: { branch } });
});

/**
 * Updates a branch owned by the authenticated user.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const updateBranch = asyncHandler(async (req, res) => {
  const branch = await Branch.findOne({ _id: req.params.id, user: req.user._id });
  if (!branch) {
    throw new CustomError(NOT_FOUND, 'Branch not found');
  }
  if (branch.isArchived) {
    throw new CustomError(CONFLICT, 'Branch is archived');
  }
  const { name, location } = req.validated.body;
  if (name !== undefined) branch.name = name;
  if (location !== undefined) branch.location = location;
  await branch.save();
  res.status(OK).json({ success: true, message: 'Branch updated', data: { branch } });
});

/**
 * Deletes a branch owned by the authenticated user. Phase 3 ships the plain
 * CRUD delete (T-3-02a/T-3-01a); Phase 8 T-8-02 replaces it with the §35
 * two-path lifecycle (archive → guarded permanent delete).
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const deleteBranch = asyncHandler(async (req, res) => {
  const branch = await Branch.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!branch) {
    throw new CustomError(NOT_FOUND, 'Branch not found');
  }
  res.status(OK).json({ success: true, message: 'Branch deleted', data: null });
});
