/**
 * @module redux/features/assistantApi
 */

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './api.js';

/**
 * RTK Query slice for the assistant chat endpoints (sendMessage,
 * listConversations, listMessages, addToolApprovalResponse); consumed by
 * `chatAdapter.js` in a later phase.
 */
const assistantApi = createApi({
  reducerPath: 'assistantApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export { assistantApi };
