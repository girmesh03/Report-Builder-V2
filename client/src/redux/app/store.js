/**
 * @module redux/app/store
 */

import { configureStore } from '@reduxjs/toolkit';

import { api } from '../features/api.js';
import { assistantApi } from '../features/assistantApi.js';
import authReducer from '../features/authSlice.js';
// Side-effect imports: branchSlice/reportSlice inject their endpoints into
// the shared `api` slice via `injectEndpoints` (REQ-103) — the same reducer
// and middleware, so nothing extra is registered here.
import '../features/branchSlice.js';
import '../features/reportSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [assistantApi.reducerPath]: assistantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, assistantApi.middleware),
});

export { store };
