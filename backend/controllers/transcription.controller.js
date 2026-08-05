/**
 * @module controllers/transcription
 */

import asyncHandler from 'express-async-handler';

import Audio from '../models/audio.model.js';
import Report from '../models/report.model.js';
import Transcription from '../models/transcription.model.js';
import { transcribeFile } from '../services/addis.service.js';
import constants from '../utils/constants.js';
import { CustomError } from '../utils/error.js';
import { BAD_GATEWAY, CONFLICT, CREATED, NOT_FOUND, OK } from '../utils/httpStatus.js';

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
 * Runs the STT pipeline (STEP 5–8 of `## API Contract` §6) over the
 * report's stored audio (T-4-04, `## API Contract` §6.2): every clip goes
 * through `services/addis.service.js` (single-pass WAV → PCM-level chunks →
 * `v2/stt`), the transcriptions are concatenated, and — when no chunk
 * succeeded — the report keeps `audio_attached` (audio preserved) with a
 * `502 { success: false, message: 'Transcription failed', data: {
 * reportId, status: 'audio_attached' } }` response (frontend retry per
 * `## Transcription Review` §2.1). On success: first transcription creates
 * the Transcription doc (`raw` set, `latest: ''`, `history: []` — REQ-149),
 * links it and moves the report to `transcribed`; re-transcription on an
 * already-transcribed/reviewed report overwrites `raw` and resets
 * `latest` + `history` (REQ-145).
 *
 * @param {import('express').Request} req - The request; `req.params.id` is the report id.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const transcribeReport = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ _id: req.params.id, user: req.user._id });
  if (!report) {
    throw new CustomError(NOT_FOUND, 'Report not found');
  }
  if (report.status === constants.REPORT_STATUS_COMPLETED) {
    throw new CustomError(CONFLICT, 'Cannot transcribe a completed report');
  }
  if (report.audio.length === 0) {
    throw new CustomError(CONFLICT, 'Report has no audio to transcribe');
  }
  const clips = await Audio.find({ _id: { $in: report.audio } });
  const parts = [];
  let succeededChunks = 0;
  for (const clip of clips) {
    const result = await transcribeFile(clip.filePath);
    succeededChunks += result.succeeded;
    if (result.text) {
      parts.push(result.text);
    }
  }
  if (succeededChunks === 0) {
    return res.status(BAD_GATEWAY).json({
      success: false,
      message: 'Transcription failed',
      data: { reportId: report._id.toString(), status: report.status },
    });
  }
  const raw = parts.join(' ');
  const existing = report.transcription ? await Transcription.findById(report.transcription) : null;
  let transcription;
  let created = false;
  if (existing) {
    existing.raw = raw;
    existing.latest = '';
    existing.history = [];
    transcription = await existing.save();
  } else {
    transcription = await Transcription.create({ user: req.user._id, report: report._id, raw });
    report.transcription = transcription._id;
    created = true;
  }
  report.status = constants.REPORT_STATUS_TRANSCRIBED;
  await report.save();
  res.status(created ? CREATED : OK).json({
    success: true,
    message: 'Transcription completed',
    data: { transcription, created },
  });
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
