/**
 * @module redux/features/assistantApi
 */

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './api.js';

/**
 * RTK Query slice for the assistant chat REST endpoints (`docs/initial-doc.md`
 * §3.5.2): list/create/delete conversations, list messages, and resolve tool
 * approvals. The `conversations` result feeds `aiConversationSlice` via
 * matching `extraReducers`; the Assistant page drives the `@mui/x-chat`
 * `ChatBox` `conversations`/`activeConversationId` props from that slice.
 * Message streaming (`POST …/messages` SSE in the `chatAdapter`) intentionally
 * bypasses this slice — `baseQueryWithReauth` returns JSON and cannot expose
 * the `ReadableStream<ChatMessageChunk>` that the Chat provider consumes
 * (user decision; SSE goes through a raw `fetch` in the adapter).
 */
const assistantApi = createApi({
  reducerPath: 'assistantApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Conversation'],
  endpoints: (build) => ({
    listConversations: build.query({
      query: () => ({ url: '/assistant/conversations' }),
      transformResponse: (response) => response.data.conversations,
      providesTags: ['Conversation'],
    }),
    createConversation: build.mutation({
      query: (reportId) => ({
        url: '/assistant/conversations',
        method: 'POST',
        body: { reportId },
      }),
      transformResponse: (response) => response.data.conversation,
      invalidatesTags: ['Conversation'],
    }),
    listMessages: build.query({
      query: (conversationId) => `/assistant/conversations/${conversationId}/messages`,
      transformResponse: (response) => response.data.messages,
    }),
    approveToolCall: build.mutation({
      query: ({ toolCallId, approved, reason }) => ({
        url: `/assistant/tools/${toolCallId}/approval`,
        method: 'POST',
        body: { approved, reason },
      }),
      transformResponse: (response) => response.data.approved,
    }),
    deleteConversation: build.mutation({
      query: (conversationId) => ({
        url: `/assistant/conversations/${conversationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Conversation'],
    }),
    deleteMessage: build.mutation({
      query: ({ conversationId, messageId }) => ({
        url: `/assistant/conversations/${conversationId}/messages/${messageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Conversation'],
    }),
  }),
});

export const {
  useListConversationsQuery,
  useCreateConversationMutation,
  useListMessagesQuery,
  useApproveToolCallMutation,
  useDeleteConversationMutation,
  useDeleteMessageMutation,
} = assistantApi;

export { assistantApi };