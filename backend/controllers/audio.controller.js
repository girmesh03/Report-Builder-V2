/**
 * @module controllers/audio
 */

import asyncHandler from 'express-async-handler';

import Audio from '../models/audio.model.js';
import Report from '../models/report.model.js';
import constants from '../utils/constants.js';
import { CustomError } from '../utils/error.js';
import { CONFLICT, CREATED, NOT_FOUND, OK } from '../utils/httpStatus.js';

/**
 * Records narration metadata for a report (`## Data Modeling` §4.2) and
 * advances the report to `audio_attached` — the first steps of the
 * narration → transcription chain (W-01..W-02, `## API Contract` §6.1
 * STEP 3–4). Phase 4's upload endpoint attaches the physical file; Phase 3
 * is metadata-first (T-3-04c).
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const createAudio = asyncHandler(async (req, res) => {
  const { reportId, originalName, mimeType, fileSize, duration } = req.validated.body;
  const report = await Report.findOne({ _id: reportId, user: req.user._id });
  if (!report) {
    throw new CustomError(NOT_FOUND, 'Report not found');
  }
  if (report.status === constants.REPORT_STATUS_COMPLETED) {
    throw new CustomError(CONFLICT, 'Cannot attach audio to a completed report');
  }
  const audio = await Audio.create({
    user: req.user._id,
    report: reportId,
    originalName,
    mimeType,
    fileSize,
    duration,
  });
  report.audio.push(audio._id);
  if (report.status === constants.REPORT_STATUS_DRAFT) {
    report.status = constants.REPORT_STATUS_AUDIO_ATTACHED;
  }
  await report.save();
  res.status(CREATED).json({ success: true, message: 'Audio created', data: { audio } });
});

/**
 * Lists the authenticated user's audio clips — paginated, with an optional
 * `report` filter.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const listAudios = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || constants.PAGINATION_DEFAULT_PAGE;
  const limit = Math.min(Number(req.query.limit) || constants.PAGINATION_DEFAULT_LIMIT, constants.PAGINATION_MAX_LIMIT);
  const query = { user: req.user._id };
  if (req.query.report) {
    query.report = req.query.report;
  }
  const result = await Audio.paginate(query, { page, limit, sort: { createdAt: -1 } });
  res.status(OK).json({ success: true, message: 'Audio clips retrieved', data: result });
});

/**
 * Returns a single audio clip owned by the authenticated user.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const getAudio = asyncHandler(async (req, res) => {
  const audio = await Audio.findOne({ _id: req.params.id, user: req.user._id });
  if (!audio) {
    throw new CustomError(NOT_FOUND, 'Audio not found');
  }
  res.status(OK).json({ success: true, message: 'Audio retrieved', data: { audio } });
});
