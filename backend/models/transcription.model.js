/**
 * @module models/transcription
 */

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

/**
 * Transcription document.
 *
 * @typedef {Object} Transcription
 * @property {ObjectId} user - The owner supervisor.
 * @property {ObjectId} report - The report the transcription belongs to.
 * @property {string} raw - Original STT output concatenated from all clips and chunks.
 * @property {string} latest - The current reviewed/corrected text.
 * @property {Array<ReviewEntry>} history - Ordered review/correction iterations.
 */

/**
 * Review iteration entry.
 *
 * @typedef {Object} ReviewEntry
 * @property {string} instruction - The AI-correction instruction; empty for direct user edits.
 * @property {string} reviewed - The text produced by that review iteration.
 * @property {*} reviewer - User ObjectId or provider string (addis | gemini | nvidia).
 * @property {Date} editedAt - Review time.
 */

const transcriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    report: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true },
    raw: { type: String, default: '' },
    latest: { type: String, default: '' },
    history: [
      {
        instruction: { type: String },
        reviewed: { type: String },
        reviewer: { type: mongoose.Schema.Types.Mixed },
        editedAt: { type: Date, default: Date.now },
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

transcriptionSchema.plugin(mongoosePaginate);

const Transcription = mongoose.model('Transcription', transcriptionSchema);

export default Transcription;
