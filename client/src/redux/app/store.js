/**
 * @module redux/app/store
 */

import { configureStore } from '@reduxjs/toolkit';

import { api } from '../features/api.js';
import { assistantApi } from '../features/assistantApi.js';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [assistantApi.reducerPath]: assistantApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, assistantApi.middleware),
});

export { store };
