/**
 * @module redux/app/store
 */

import { configureStore } from '@reduxjs/toolkit';

import { api } from '../features/api.js';
import { assistantApi } from '../features/assistantApi.js';
import authReducer from '../features/authSlice.js';
import aiConversationReducer from '../features/aiConversationSlice.js';
// Side-effect imports: branchSlice/reportSlice/transcriptionSlice inject
// their endpoints into the shared `api` slice via `injectEndpoints`
// (REQ-103) — the same reducer and middleware, so nothing extra is
// registered here. transcriptionSlice is required for the transcription
// endpoints (`useTranscribeReportMutation`, etc.) to exist at all; without
// the import, calls hit unknown endpoints and 401/refresh handlers never
// resolve them (F-4-03).
import '../features/branchSlice.js';
import '../features/reportSlice.js';
import '../features/transcriptionSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    aiConversation: aiConversationReducer,
    [api.reducerPath]: api.reducer,
    [assistantApi.reducerPath]: assistantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, assistantApi.middleware),
});

export { store };
