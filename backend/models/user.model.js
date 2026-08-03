/**
 * @module models/user
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import constants from '../utils/constants.js';

/**
 * User document.
 *
 * @typedef {Object} User
 * @property {string} firstName - Extracted from the email local part or the Google profile name.
 * @property {string} lastName - Extracted from the email local part or the Google profile name.
 * @property {string} email - The account identifier; unique.
 * @property {string} password - bcryptjs-hashed, never selected, never in JSON output.
 * @property {string} avatar - Optional profile picture.
 * @property {string} position - Optional profile position.
 * @property {string} refreshToken - Refresh-token rotation storage.
 * @property {string} authProvider - Registration origin: local | google.
 */

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: '' },
    position: { type: String, default: '' },
    refreshToken: { type: String },
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete ret.id;
        delete ret.__v;
        delete ret.password;
        delete ret.refreshToken;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret) {
        delete ret.id;
        delete ret.__v;
        delete ret.password;
        delete ret.refreshToken;
        return ret;
      },
    },
  },
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`.trim();
});

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, constants.BCRYPT_SALT_ROUNDS);
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
