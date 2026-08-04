/**
 * @module controllers/report
 */

import asyncHandler from 'express-async-handler';

import Branch from '../models/branch.model.js';
import Report from '../models/report.model.js';
import constants from '../utils/constants.js';
import { CustomError } from '../utils/error.js';
import { CREATED, BAD_REQUEST, NOT_FOUND, OK } from '../utils/httpStatus.js';

/** @type {string[]} Branch fields populated on report queries. */
const BRANCH_POPULATE_FIELDS = 'name location';

/** @type {string[]} Report-level populated refs (`## Data Modeling` §2). */
const REPORT_POPULATE_PATHS = [
  { path: 'branches.branchId', select: BRANCH_POPULATE_FIELDS },
  { path: 'audio', select: 'originalName mimeType fileSize duration createdAt' },
  { path: 'transcription', select: 'raw latest history createdAt updatedAt' },
];

/**
 * Builds the user-scoped list query with the optional `status`, `date`
 * (exact DD-MM-YYYY), `branchId` (exact branch), `search` (date or
 * branch-name), and `isArchived` filters.
 *
 * @param {import('express').Request} req - The request.
 * @returns {Promise<import('mongoose').FilterQuery>} The report query.
 */
async function buildListQuery(req) {
  const query = { user: req.user._id };
  if (req.query.isArchived !== undefined) {
    query.isArchived = req.query.isArchived === 'true';
  } else {
    query.isArchived = false;
  }
  if (req.query.status) {
    query.status = req.query.status;
  }
  if (req.query.date) {
    query.date = String(req.query.date).trim();
  }
  if (req.query.branchId) {
    query['branches.branchId'] = req.query.branchId;
  }
  if (req.query.search) {
    const term = String(req.query.search).trim();
    if (!term) return query;
    const dateMatch = { date: { $regex: term, $options: 'i' } };
    const ownedBranches = await Branch.find({ user: req.user._id, name: { $regex: term, $options: 'i' } })
      .select('_id')
      .lean();
    const branchIds = ownedBranches.map((branch) => branch._id);
    const branchMatch = branchIds.length > 0 ? { 'branches.branchId': { $in: branchIds } } : null;
    query.$or = branchMatch ? [{ ...dateMatch }, branchMatch] : [dateMatch];
  }
  return query;
}

/**
 * Lists the authenticated user's reports — paginated, sorted by
 * `{ user: 1, createdAt: -1 }` (`## API Contract` §8), active-only by
 * default; optional `status`, `date`, `branchId`, `isArchived`, and
 * `search` filters.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const listReports = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || constants.PAGINATION_DEFAULT_PAGE;
  const limit = Math.min(Number(req.query.limit) || constants.PAGINATION_DEFAULT_LIMIT, constants.PAGINATION_MAX_LIMIT);
  const query = await buildListQuery(req);
  const result = await Report.paginate(query, {
    page,
    limit,
    sort: { createdAt: -1 },
    populate: REPORT_POPULATE_PATHS,
  });
  res.status(OK).json({ success: true, message: 'Reports retrieved', data: result });
});

/**
 * Returns a single report owned by the authenticated user with its populated
 * branches, audio clips, and transcription.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const getReport = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ _id: req.params.id, user: req.user._id }).populate(REPORT_POPULATE_PATHS);
  if (!report) {
    throw new CustomError(NOT_FOUND, 'Report not found');
  }
  res.status(OK).json({ success: true, message: 'Report retrieved', data: { report } });
});

/**
 * Creates a daily report in `draft` status (`## API Contract` §8): date,
 * branches[] (branchId must reference an owned branch), clockIn, clockOut.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const createReport = asyncHandler(async (req, res) => {
  const { date, branches, clockIn, clockOut } = req.validated.body;
  const branchIds = branches.map((entry) => entry.branchId);
  const ownedCount = await Branch.countDocuments({ _id: { $in: branchIds }, user: req.user._id, isArchived: false });
  if (ownedCount !== branchIds.length) {
    throw new CustomError(NOT_FOUND, 'One or more branches were not found');
  }
  const report = await Report.create({
    user: req.user._id,
    date,
    branches,
    clockIn: clockIn ?? '',
    clockOut: clockOut ?? '',
  });
  res.status(CREATED).json({ success: true, message: 'Report created', data: { report } });
});

/**
 * Updates a report owned by the authenticated user (metadata plus, per the
 * Phase 3 user decision, optional generated-text edits): the previous
 * generated text is preserved as a `generatedHistory[]` entry before the new
 * text replaces it (BR-07/08 — editable after generation, AD-010).
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const updateReport = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ _id: req.params.id, user: req.user._id });
  if (!report) {
    throw new CustomError(NOT_FOUND, 'Report not found');
  }
  const { date, branches, clockIn, clockOut, generated, provider } = req.validated.body;
  if (branches !== undefined) {
    const branchIds = branches.map((entry) => entry.branchId);
    const ownedCount = await Branch.countDocuments({
      _id: { $in: branchIds },
      user: req.user._id,
      isArchived: false,
    });
    if (ownedCount !== branchIds.length) {
      throw new CustomError(NOT_FOUND, 'One or more branches were not found');
    }
    report.branches = branches;
  }
  if (date !== undefined) report.date = date;
  if (clockIn !== undefined) report.clockIn = clockIn;
  if (clockOut !== undefined) report.clockOut = clockOut;
  if (generated !== undefined && generated !== report.generated) {
    if (report.generated) {
      if (!provider) {
        throw new CustomError(BAD_REQUEST, 'Provider is required when updating generated text');
      }
      report.generatedHistory.push({ provider, text: report.generated });
    }
    report.generated = generated;
  }
  await report.save();
  const populated = await report.populate(REPORT_POPULATE_PATHS);
  res.status(OK).json({ success: true, message: 'Report updated', data: { report: populated } });
});

/**
 * Deletes a report owned by the authenticated user. Phase 3 ships the plain
 * CRUD delete (T-3-02a); Phase 8 T-8-02 replaces it with the §35 two-path
 * lifecycle (archive → guarded cascade delete in a session transaction).
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!report) {
    throw new CustomError(NOT_FOUND, 'Report not found');
  }
  res.status(OK).json({ success: true, message: 'Report deleted', data: null });
});
