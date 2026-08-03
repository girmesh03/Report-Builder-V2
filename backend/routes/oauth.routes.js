/**
 * @module routes/oauth
 */

import { Router } from 'express';

import { googleOAuthCallback, googleOAuthStart } from '../controllers/auth.controller.js';

const router = Router();

router.get('/google', googleOAuthStart);
router.get('/google/callback', googleOAuthCallback);

export default router;
