/**
 * @module controllers/user
 */

import asyncHandler from 'express-async-handler';

import { OK } from '../utils/httpStatus.js';

/**
 * GET /api/v1/user/profile — the authenticated user's profile.
 *
 * @param {import('express').Request} req - The request with `req.user`.
 * @param {import('express').Response} res - The response.
 * @returns {import('express').Response} Responds 200 with the profile.
 */
const getProfile = asyncHandler(async (req, res) => {
  res.status(OK).json({ success: true, message: 'User profile fetched successfully', data: { user: req.user } });
});

/**
 * PUT /api/v1/user/profile — updates the optional profile fields
 * firstName, lastName, avatar, and position (REQ-090).
 *
 * @param {import('express').Request} req - The request with `req.validated`.
 * @param {import('express').Response} res - The response.
 * @returns {Promise<void>} Responds 200 with the updated profile.
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, avatar, position } = req.validated;
  if (firstName !== undefined) {
    req.user.firstName = firstName;
  }
  if (lastName !== undefined) {
    req.user.lastName = lastName;
  }
  if (avatar !== undefined) {
    req.user.avatar = avatar;
  }
  if (position !== undefined) {
    req.user.position = position;
  }
  await req.user.save();
  res.status(OK).json({ success: true, message: 'Profile updated successfully', data: { user: req.user } });
});

export { getProfile, updateProfile };
