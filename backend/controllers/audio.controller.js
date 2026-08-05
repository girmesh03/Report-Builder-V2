/**
 * @module controllers/audio
 */

import { execFile } from 'node:child_process';
import { createReadStream, existsSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import path from 'node:path';

import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

import env from '../config/env.js';
import Audio from '../models/audio.model.js';
import Report from '../models/report.model.js';
import { UPLOADS_AUDIO_DIR } from '../middleware/upload.middleware.js';
import constants from '../utils/constants.js';
import { CustomError } from '../utils/error.js';
import {
  CONFLICT,
  CREATED,
  NOT_FOUND,
  OK,
  UNPROCESSABLE_ENTITY,
} from '../utils/httpStatus.js';
import logger from '../utils/logger.js';

/**
 * Resolves an Audio `filePath` back to a real file on disk: only the
 * basename is used inside the uploads directory, so stored paths can never
 * escape it (path traversal guard).
 *
 * @param {string} filePath - The stored `Audio.filePath`.
 * @returns {string} The resolved absolute path.
 */
function resolveUploadPath(filePath) {
  return path.resolve(UPLOADS_AUDIO_DIR, path.basename(filePath));
}

/**
 * A 422 validation failure carrying the REQ-198 errors-array shape — the
 * same envelope the express-validator layer and the duration check emit,
 * so every upload rejection is consistent (F-4-05).
 *
 * @param {string} field - The offending form field.
 * @param {string} message - The client-safe message.
 * @returns {CustomError} The error with an `errors` array attached.
 */
function validationFailure(field, message) {
  const error = new CustomError(UNPROCESSABLE_ENTITY, 'Validation failed');
  error.errors = [{ field, message }];
  return error;
}

/**
 * Reads an audio file's duration via ffprobe
 * (`ffprobe -v error -show_entries format=duration -of json`). Unreadable
 * files or unparseable output reject with a 422 validation failure — the
 * ffprobe duration validation of `## API Contract` §6 (REQ-143).
 *
 * @param {string} filePath - The uploaded file to probe.
 * @returns {Promise<number>} The duration in seconds.
 */
function probeAudioDuration(filePath) {
  return new Promise((resolve, reject) => {
    execFile(
      env.FFPROBE_PATH,
      ['-v', 'error', '-show_entries', 'format=duration', '-of', 'json', filePath],
      { timeout: constants.AUDIO_PROBE_TIMEOUT_MS },
      (error, stdout) => {
        if (error) {
          reject(validationFailure('clips', 'Audio file could not be validated'));
          return;
        }
        let duration;
        try {
          duration = Number(JSON.parse(stdout).format?.duration);
        } catch (_parseError) {
          reject(validationFailure('clips', 'Audio file could not be validated'));
          return;
        }
        if (!Number.isFinite(duration)) {
          reject(validationFailure('clips', 'Audio file could not be validated'));
          return;
        }
        resolve(duration);
      },
    );
  });
}

/**
 * Best-effort cleanup of multer-stored clip files after a rejected upload.
 * Multer only removes files it wrote when an error originates in *its own*
 * middleware; when this controller rejects (probe failure, duration limit,
 * missing/foreign report, completed report), the stored `{uuid}.webm` files
 * would otherwise orphan under `UPLOADS_AUDIO_DIR` (Phase 4 corrections —
 * rollback parity with the client-side draft deletion).
 *
 * @param {import('multer').File[]} clips - The uploaded file descriptors.
 * @returns {void}
 */
export function removeStoredClips(clips) {
  clips.forEach((clip) => {
    unlink(clip.path).catch((unlinkError) => {
      logger.warn('Failed to remove uploaded clip', { path: clip.path, error: unlinkError.message });
    });
  });
}

/**
 * Multipart audio upload (T-4-01, `## API Contract` §6): multer has already
 * stored each `clips` file as `{uuid}.webm` under the gitignored
 * `backend/uploads/audio/`; this handler validates every file with ffprobe
 * (duration ≤ `AUDIO_MAX_DURATION_SEC`, else a 422 validation failure),
 * creates one Audio document per clip (metadata only — path, duration,
 * size, MIME; T-4-01b), pushes the ids into `Report.audio`, and advances
 * `draft` → `audio_attached` (REQ-168). Files are probed before any
 * document is written, so a rejected clip never leaves partial rows, and
 * any rejection after multer stored the files removes them from disk
 * immediately (`removeStoredClips`) instead of waiting for the Phase 8
 * orphan sweep (Phase 4 corrections). The clip-create loop and the report
 * status update run inside one MongoDB session transaction (REQ-082,
 * ADR-018): a mid-loop failure or a failed `report.save()` leaves no
 * orphaned Audio documents — only the physical files, which the catch
 * removes. `req.cleanedUploads` marks that this handler already initiated
 * file cleanup, so the route-level validator-failure cleanup (F-4-06)
 * never double-unlinks.
 *
 * @param {import('express').Request} req - The request; carries `req.validated.body.reportId` and `req.files`.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>}
 */
export const uploadAudioClips = asyncHandler(async (req, res) => {
  const { reportId } = req.validated.body;
  const clips = req.files ?? [];
  try {
    if (clips.length === 0) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        success: false,
        message: 'Validation failed',
        data: { errors: [{ field: 'clips', message: 'At least one audio clip is required' }] },
      });
    }
    const report = await Report.findOne({ _id: reportId, user: req.user._id });
    if (!report) {
      throw new CustomError(NOT_FOUND, 'Report not found');
    }
    if (report.status === constants.REPORT_STATUS_COMPLETED) {
      throw new CustomError(CONFLICT, 'Cannot attach audio to a completed report');
    }
    const durations = [];
    for (const clip of clips) {
      const duration = await probeAudioDuration(clip.path);
      if (duration > constants.AUDIO_MAX_DURATION_SEC) {
        removeStoredClips(clips);
        req.cleanedUploads = true;
        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          message: 'Validation failed',
          data: {
            errors: [{ field: 'clips', message: 'Audio clip duration exceeds 15 minutes' }],
          },
        });
      }
      durations.push(duration);
    }
    const session = await mongoose.startSession();
    let audioDocs = [];
    try {
      session.startTransaction();
      for (let index = 0; index < clips.length; index += 1) {
        const clip = clips[index];
        // The array-first form is REQUIRED here: mongoose `Model.create(doc,
        // { session })` with a plain object treats the second argument as a
        // second document (mongoose 9 model.js), so `{ session }` was being
        // inserted as an empty doc → ValidationError on every required field
        // → the cryptic 422 the browser reported. Only
        // `create([doc], { session })` (or `save({ session })`) honors
        // options (F-4-07 correction).
        const [audio] = await Audio.create(
          [
            {
              user: req.user._id,
              report: reportId,
              originalName: clip.originalname,
              mimeType: clip.mimetype,
              filePath: clip.path,
              fileSize: clip.size,
              duration: durations[index],
            },
          ],
          { session },
        );
        audioDocs.push(audio);
        report.audio.push(audio._id);
      }
      if (report.status === constants.REPORT_STATUS_DRAFT) {
        report.status = constants.REPORT_STATUS_AUDIO_ATTACHED;
      }
      await report.save({ session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
    res
      .status(CREATED)
      .json({ success: true, message: 'Audio uploaded', data: { audio: audioDocs } });
  } catch (error) {
    removeStoredClips(clips);
    req.cleanedUploads = true;
    if (error.errors) {
      // Normalize to the REQ-198 array shape: mongoose ValidationError
      // carries a `{ field: { message } }` object map, while our own
      // failures attach `[{ field, message }]` — forwarding the raw map
      // leaked the internal shape and made the frontend toast a bare
      // "Validation failed" (Phase 4 corrections — F-4-05 follow-up).
      const rawErrors = error.errors;
      const errors = Array.isArray(rawErrors)
        ? rawErrors
        : Object.entries(rawErrors).map(([field, entry]) => ({
            field,
            message: entry?.message ?? String(entry),
          }));
      return res.status(UNPROCESSABLE_ENTITY).json({
        success: false,
        message: 'Validation failed',
        data: { errors },
      });
    }
    throw error;
  }
});

/**
 * Streams an owned clip's stored file into an inline `<audio>` player
 * (`## API Contract` §6.4): Content-Type from the stored MIME, exact
 * Content-Length, chunked pipe. A stream error (file deleted between the
 * existence check and the pipe, mid-read failure) forwards to the global
 * error handler instead of emitting an unhandled `'error'` event (F-4-09).
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @param {import('express').NextFunction} next - Next; receives stream errors.
 * @returns {Promise<void>}
 */
export const streamAudio = asyncHandler(async (req, res, next) => {
  const audio = await Audio.findOne({ _id: req.params.id, user: req.user._id });
  if (!audio) {
    throw new CustomError(NOT_FOUND, 'Audio not found');
  }
  const filePath = resolveUploadPath(audio.filePath);
  if (!existsSync(filePath)) {
    throw new CustomError(NOT_FOUND, 'Audio file not found');
  }
  res.setHeader('Content-Type', audio.mimeType);
  res.setHeader('Content-Length', String(audio.fileSize));
  const stream = createReadStream(filePath);
  stream.on('error', (streamError) => next(streamError));
  stream.pipe(res);
});

/**
 * Sends an owned clip as a download attachment with its original name
 * (`## API Contract` §6.4); the filename is RFC 5987 UTF-8 encoded so
 * Amharic names survive the header.
 *
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @param {import('express').NextFunction} next - Next; receives stream errors.
 * @returns {Promise<void>}
 */
export const downloadAudio = asyncHandler(async (req, res, next) => {
  const audio = await Audio.findOne({ _id: req.params.id, user: req.user._id });
  if (!audio) {
    throw new CustomError(NOT_FOUND, 'Audio not found');
  }
  const filePath = resolveUploadPath(audio.filePath);
  if (!existsSync(filePath)) {
    throw new CustomError(NOT_FOUND, 'Audio file not found');
  }
  res.setHeader('Content-Type', audio.mimeType);
  res.setHeader('Content-Length', String(audio.fileSize));
  res.setHeader(
    'Content-Disposition',
    `attachment; filename*=UTF-8''${encodeURIComponent(audio.originalName)}`,
  );
  const stream = createReadStream(filePath);
  stream.on('error', (streamError) => next(streamError));
  stream.pipe(res);
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
