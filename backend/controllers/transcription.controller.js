/**
 * @module controllers/transcription
 */

import asyncHandler from 'express-async-handler';

import Report from '../models/report.model.js';
import Transcription from '../models/transcription.model.js';
import constants from '../utils/constants.js';
import { CustomError } from '../utils/error.js';
import { CONFLICT, CREATED, NOT_FOUND, OK } from '../utils/httpStatus.js';

/**
 * Creates a transcription document for a report in `audio_attached` status
 * (W-02..W-03, `## API Contract` §6.1 STEP 6–7): links `Report.transcription`
 * and advances the status to `transcribed`. Phase 4's STT pipeline reuses
 * this write path.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const createTranscription = asyncHandler(async (req, res) => {
  const { reportId, raw } = req.validated.body;
  const report = await Report.findOne({ _id: reportId, user: req.user._id });
  if (!report) {
    throw new CustomError(NOT_FOUND, 'Report not found');
  }
  if (report.status !== constants.REPORT_STATUS_AUDIO_ATTACHED) {
    throw new CustomError(CONFLICT, 'Transcription requires a report with attached audio');
  }
  if (report.transcription) {
    throw new CustomError(CONFLICT, 'Report already has a transcription');
  }
  const transcription = await Transcription.create({ user: req.user._id, report: reportId, raw });
  report.transcription = transcription._id;
  report.status = constants.REPORT_STATUS_TRANSCRIBED;
  await report.save();
  res.status(CREATED).json({ success: true, message: 'Transcription created', data: { transcription } });
});

/**
 * Lists the authenticated user's transcriptions — paginated, with an
 * optional `report` filter.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const listTranscriptions = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || constants.PAGINATION_DEFAULT_PAGE;
  const limit = Math.min(Number(req.query.limit) || constants.PAGINATION_DEFAULT_LIMIT, constants.PAGINATION_MAX_LIMIT);
  const query = { user: req.user._id };
  if (req.query.report) {
    query.report = req.query.report;
  }
  const result = await Transcription.paginate(query, { page, limit, sort: { createdAt: -1 } });
  res.status(OK).json({ success: true, message: 'Transcriptions retrieved', data: result });
});

/**
 * Returns a single transcription owned by the authenticated user.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const getTranscription = asyncHandler(async (req, res) => {
  const transcription = await Transcription.findOne({ _id: req.params.id, user: req.user._id });
  if (!transcription) {
    throw new CustomError(NOT_FOUND, 'Transcription not found');
  }
  res.status(OK).json({ success: true, message: 'Transcription retrieved', data: { transcription } });
});

/**
 * Reviews/corrects a transcription (W-04): pushes a `history[]` entry
 * (reviewer = the user's ObjectId for direct edits, `## Data Modeling`
 * §4.3), writes `latest`, and advances the report to `reviewed` when it is
 * `transcribed`. Re-reviews on an already-reviewed report are allowed.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const updateTranscription = asyncHandler(async (req, res) => {
  const transcription = await Transcription.findOne({ _id: req.params.id, user: req.user._id });
  if (!transcription) {
    throw new CustomError(NOT_FOUND, 'Transcription not found');
  }
  const report = await Report.findOne({ _id: transcription.report, user: req.user._id });
  if (!report) {
    throw new CustomError(NOT_FOUND, 'Report not found');
  }
  if (report.status !== constants.REPORT_STATUS_TRANSCRIBED && report.status !== constants.REPORT_STATUS_REVIEWED) {
    throw new CustomError(CONFLICT, 'Transcription review requires a transcribed report');
  }
  const { reviewed } = req.validated.body;
  transcription.history.push({ instruction: '', reviewed, reviewer: req.user._id });
  transcription.latest = reviewed;
  await transcription.save();
  if (report.status !== constants.REPORT_STATUS_REVIEWED) {
    report.status = constants.REPORT_STATUS_REVIEWED;
    await report.save();
  }
  res.status(OK).json({ success: true, message: 'Transcription updated', data: { transcription } });
});
