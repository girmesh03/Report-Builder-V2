/**
 * @module redux/features/api
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_CONFIG } from '../../utils/constants.js';

/**
 * Cookie-aware base query: all frontend HTTP calls go through this wrapper
 * (REQ-104); on 401 it refreshes via `POST /auth/refresh` and retries the
 * original request; on refresh failure it clears local storage, dispatches
 * logout, and surfaces the refresh error (REQ-105).
 *
 * @param {import('@reduxjs/toolkit/query/react').BaseQueryFn} args - The endpoint request args.
 * @param {import('@reduxjs/toolkit/query/react').BaseQueryApi} api - The RTK Query API object.
 * @param {object} extraOptions - Endpoint extra options.
 * @returns {Promise<import('@reduxjs/toolkit/query/react').QueryReturnValue>} The query result.
 */
async function baseQueryWithReauth(args, api, extraOptions) {
  const baseQuery = fetchBaseQuery({ baseUrl: API_CONFIG.VITE_API_BASE_URL, credentials: 'include' });
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions);
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.clear();
      api.dispatch({ type: 'auth/logout' });
      result = refreshResult;
    }
  }
  return result;
}

const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export { api, baseQueryWithReauth };
