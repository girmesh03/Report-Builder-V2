/**
 * @module models/audio
 */

import mongoose from 'mongoose';

/**
 * Audio document — one per uploaded clip; no status field (Report.status
 * covers the aggregate state).
 *
 * @typedef {Object} Audio
 * @property {ObjectId} user - Who uploaded it.
 * @property {ObjectId} report - The report the clip belongs to.
 * @property {string} originalName - File name as sent from the browser.
 * @property {string} mimeType - Media type from the browser.
 * @property {string} filePath - Server path where multer saved the file.
 * @property {number} fileSize - Raw byte size; capped by AUDIO_MAX_SIZE_BYTES.
 * @property {number} duration - Seconds; capped by AUDIO_MAX_DURATION_SEC.
 */

const audioSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    report: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    filePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    duration: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform(_doc, ret) {
        delete ret.id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Audio = mongoose.model('Audio', audioSchema);

export default Audio;
