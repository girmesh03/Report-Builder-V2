/**
 * @module models/branch
 */

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import constants from '../utils/constants.js';

/**
 * Branch document.
 *
 * @typedef {Object} Branch
 * @property {string} name - Branch name.
 * @property {string} location - Branch location.
 * @property {boolean} isArchived - Archive flag.
 * @property {Date} archivedAt - Set on archive; 30-day TTL index.
 * @property {ObjectId} user - The owner supervisor.
 */

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    isArchived: { type: Boolean, default: false },
    archivedAt: { type: Date, default: null },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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

branchSchema.index({ user: 1, name: 1 }, { unique: true });
branchSchema.index(
  { archivedAt: 1 },
  { expireAfterSeconds: constants.ARCHIVE_TTL_SECONDS, partialFilterExpression: { archivedAt: { $ne: null } } },
);

branchSchema.plugin(mongoosePaginate);

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;
