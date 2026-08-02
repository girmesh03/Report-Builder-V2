/**
 * @module models/report
 */

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import constants from '../utils/constants.js';

/**
 * Daily report document.
 *
 * @typedef {Object} Report
 * @property {ObjectId} user - The supervisor who owns the report.
 * @property {string} date - DD-MM-YYYY display value, not a Date object.
 * @property {Array<BranchVisit>} branches - Per-branch visit times.
 * @property {string} clockIn - Top-level work-day entry time.
 * @property {string} clockOut - Top-level work-day exit time.
 * @property {ObjectId[]} audio - Audio clips linked to the report.
 * @property {ObjectId} transcription - The report transcription.
 * @property {string} status - Lifecycle status: draft | audio_attached | transcribed | reviewed | completed.
 * @property {boolean} isArchived - Archive flag.
 * @property {Date} archivedAt - Set on archive; 30-day TTL index.
 * @property {string} generated - Latest AI-generated report text.
 * @property {Array<GeneratedVersion>} generatedHistory - Every successful generation.
 */

/**
 * Per-branch visit entry.
 *
 * @typedef {Object} BranchVisit
 * @property {ObjectId} branchId - The visited branch.
 * @property {string} clockIn - Arrival time at the branch.
 * @property {string} clockOut - Departure time from the branch.
 */

/**
 * Generated report version.
 *
 * @typedef {Object} GeneratedVersion
 * @property {string} provider - addis | gemini | nvidia.
 * @property {string} text - The generated report text.
 * @property {Date} generatedAt - Generation time.
 */

const reportSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    branches: [
      {
        branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
        clockIn: { type: String },
        clockOut: { type: String },
      },
    ],
    clockIn: { type: String },
    clockOut: { type: String },
    audio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Audio' }],
    transcription: { type: mongoose.Schema.Types.ObjectId, ref: 'Transcription', default: null },
    status: {
      type: String,
      enum: ['draft', 'audio_attached', 'transcribed', 'reviewed', 'completed'],
      default: 'draft',
    },
    isArchived: { type: Boolean, default: false },
    archivedAt: { type: Date, default: null },
    generated: { type: String, default: '' },
    generatedHistory: [
      {
        provider: { type: String, enum: ['addis', 'gemini', 'nvidia'], required: true },
        text: { type: String, required: true },
        generatedAt: { type: Date, default: Date.now },
      },
    ],
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

reportSchema.index({ user: 1, createdAt: -1 });
reportSchema.index({ status: 1 });
reportSchema.index(
  { archivedAt: 1 },
  { expireAfterSeconds: constants.ARCHIVE_TTL_SECONDS, partialFilterExpression: { archivedAt: { $ne: null } } },
);

reportSchema.plugin(mongoosePaginate);

const Report = mongoose.model('Report', reportSchema);

export default Report;
