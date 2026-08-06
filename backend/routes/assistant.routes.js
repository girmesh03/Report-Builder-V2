/**
 * @module routes/assistant
 */

import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';

import authenticate from '../middleware/authenticate.middleware.js';
import {
  approveToolCall,
  createConversation,
  deleteConversation,
  deleteMessage,
  listConversations,
  listMessages,
  regenerateMessage,
  sendMessage,
} from '../controllers/ai.controller.js';
import {
  validateConversationId,
  validateCreateConversation,
  validateMessageId,
  validateRegenerate,
  validateSendMessage,
  validateToolApproval,
} from '../validators/ai.validator.js';
import constants from '../utils/constants.js';
import { OK } from '../utils/httpStatus.js';

const aiLimiter = rateLimit({
  windowMs: constants.RATE_LIMIT_AI_WINDOW_MS,
  max: constants.RATE_LIMIT_AI_MAX,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
    data: {},
  },
});

const router = Router();

router.get('/health', (_req, res) => {
  res.status(OK).json({ success: true, message: 'assistant routes healthy', data: {} });
});

router.get('/conversations', authenticate, listConversations);
router.post('/conversations', authenticate, aiLimiter, validateCreateConversation, createConversation);
router.get('/conversations/:id/messages', authenticate, validateConversationId, listMessages);
router.post('/conversations/:id/messages', authenticate, aiLimiter, validateSendMessage, sendMessage);
router.delete('/conversations/:id/messages/:messageId', authenticate, validateConversationId, validateMessageId, deleteMessage);
router.post('/conversations/:id/messages/:messageId/regenerate', authenticate, aiLimiter, validateRegenerate, regenerateMessage);
router.delete('/conversations/:id', authenticate, validateConversationId, deleteConversation);
router.post('/tools/:toolCallId/approval', authenticate, validateToolApproval, approveToolCall);

export default router;