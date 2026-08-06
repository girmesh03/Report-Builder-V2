/**
 * @module redux/features/aiConversation
 */

import { createSlice } from '@reduxjs/toolkit';

import { assistantApi } from './assistantApi.js';

/**
 * Assistant conversations UI state (user decision): the conversations list and
 * the active conversation id, hydrated from the `assistantApi` RTK Query
 * results via matching `extraReducers`. The Assistant page drives the
 * `@mui/x-chat` `ChatBox` `conversations`/`activeConversationId` (controlled)
 * props from these selectors; `onActiveConversationChange`/`onConversationsChange`
 * callbacks from the Chat provider write back into the slice so rail clicks,
 * deep links (`/assistant?conversation=<id>`), and the New Chat flow share one
 * source of truth. The streamed message thread lives inside the Chat store
 * (owned by `ChatBox`); this slice never mirrors message bodies.
 */
/**
 * Normalizes one conversation into the canonical rail shape. Two producers
 * exist: the backend response uses `_id` while the `@mui/x-chat` provider
 * emits `id` (the controlled `conversations` prop and `onConversationsChange`)
 * — normalizing at ingestion keeps `.map((c) => c._id)`, deep-link matching
 * and the Chat store (`conversationsById` keyed on `id`) consistent.
 *
 * @param {Object} conversation - A backend- or provider-shaped conversation.
 * @returns {Object} The canonical `{ _id, id, title, lastMessageAt }` entry.
 */
function normalizeConversation(conversation) {
  const id = conversation._id ?? conversation.id;
  return {
    _id: id,
    id,
    title: conversation.title ?? 'New Chat',
    lastMessageAt: conversation.lastMessageAt ?? conversation.createdAt ?? conversation.updatedAt ?? null,
  };
}

/**
 * Normalizes a conversation list (`({_id} | {id})[]` -> canonical shape).
 *
 * @param {Array<Object>} conversations - The raw conversation entries.
 * @returns {Array<Object>} Normalized entries, preserving order.
 */
function normalizeConversations(conversations) {
  return conversations.map(normalizeConversation);
}

const aiConversationSlice = createSlice({
  name: 'aiConversation',
  initialState: {
    /** @type {Array<Object>} Canonical conversations (newest first). */
    conversations: [],
    /** @type {string | null} Selected conversation id. */
    activeConversationId: null,
    /** @type {'idle' | 'loading' | 'succeeded' | 'failed'} Rail load state. */
    status: 'idle',
  },
  reducers: {
    setActiveConversationId(state, action) {
      state.activeConversationId = action.payload;
    },
    setConversations(state, action) {
      state.conversations = normalizeConversations(action.payload);
      state.status = 'succeeded';
    },
    removeConversation(state, action) {
      state.conversations = state.conversations.filter((conversation) => conversation._id !== action.payload);
      if (state.activeConversationId === action.payload) {
        state.activeConversationId = null;
      }
    },
    reset(state) {
      state.conversations = [];
      state.activeConversationId = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(assistantApi.endpoints.listConversations.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(assistantApi.endpoints.listConversations.matchFulfilled, (state, action) => {
        state.conversations = normalizeConversations(action.payload);
        state.status = 'succeeded';
      })
      .addMatcher(assistantApi.endpoints.listConversations.matchRejected, (state) => {
        state.status = 'failed';
      })
      .addMatcher(assistantApi.endpoints.createConversation.matchFulfilled, (state, action) => {
        const conversation = normalizeConversation(action.payload);
        const index = state.conversations.findIndex((entry) => entry._id === conversation._id);
        if (index !== -1) {
          state.conversations[index] = conversation;
        } else {
          state.conversations.unshift(conversation);
        }
        state.status = 'succeeded';
      });
  },
});

export const { setActiveConversationId, setConversations, removeConversation, reset } = aiConversationSlice.actions;

/** Conversations list (backend shape). */
const selectConversations = (state) => state.aiConversation.conversations;

/** Active conversation id. */
const selectActiveConversationId = (state) => state.aiConversation.activeConversationId;

/** Rail load state. */
const selectConversationsStatus = (state) => state.aiConversation.status;

export { selectConversations, selectActiveConversationId, selectConversationsStatus };

export default aiConversationSlice.reducer;