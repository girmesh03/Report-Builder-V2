/**
 * @module models/chatConversation
 */

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

/**
 * AI assistant conversation document (`## Data Modeling` §4.6, REQ-172).
 *
 * @typedef {Object} ChatConversation
 * @property {ObjectId} user - The owning supervisor.
 * @property {ObjectId} report - The report the conversation edits (`null` for a free chat, REQ-172/REQ-175 follow-up).
 * @property {string} title - Conversation title; defaults to "New Chat".
 * @property {Array<AssistantMessage>} messages - Ordered conversation messages.
 */

/**
 * Assistant message inside a conversation.
 *
 * @typedef {Object} AssistantMessage
 * @property {string} id - UUID identifying the message.
 * @property {string} role - user | assistant.
 * @property {string} status - streaming | complete | failed.
 * @property {Array<Object>} parts - Mixed parts: text | tool-input-available | tool-approval-request | tool-output-available.
 * @property {string} provider - addis | gemini | nvidia (recorded on assistant messages, REQ-133).
 * @property {Date} createdAt - Message time.
 */

const chatConversationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    report: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', default: null },
    title: { type: String, default: 'New Chat' },
    messages: [
      {
        id: { type: String },
        role: { type: String, enum: ['user', 'assistant'] },
        status: { type: String, enum: ['streaming', 'complete', 'failed'] },
        parts: { type: [mongoose.Schema.Types.Mixed], default: [] },
        provider: { type: String, enum: ['addis', 'gemini', 'nvidia'] },
        createdAt: { type: Date, default: Date.now },
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

chatConversationSchema.index({ user: 1, updatedAt: -1 });

chatConversationSchema.plugin(mongoosePaginate);

const ChatConversation = mongoose.model('ChatConversation', chatConversationSchema);

export default ChatConversation;
