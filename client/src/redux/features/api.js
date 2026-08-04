/**
 * @module redux/features/api
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_CONFIG, AUTH_NO_REFRESH_PATHS, AUTH_STORAGE_KEY } from '../../utils/constants.js';

/** @type {Promise<import('@reduxjs/toolkit/query/react').QueryReturnValue> | null} Shared in-flight refresh (module-level mutex). */
let refreshPromise = null;

/**
 * Cookie-aware base query: all frontend HTTP calls go through this wrapper
 * (REQ-104); on 401 it refreshes via `POST /auth/refresh` and retries the
 * original request; on refresh failure it clears local storage, dispatches
 * logout, and surfaces the refresh error (REQ-105). Auth endpoints are
 * excluded from the refresh retry on public pages (`## Redux RTK Query` §2).
 *
 * Refresh serialization (mutex, Phase 3 corrections — refresh-rotation race
 * fix): concurrent 401s share ONE in-flight `/auth/refresh` via the
 * module-level `refreshPromise`; every 401'd request awaits it, then retries
 * with the refreshed cookies. Double refreshes are impossible in any case —
 * module-level state is shared across React StrictMode double-invocations,
 * and RTK Query already dedupes identical queries per endpoint+args
 * (`## Redux RTK Query` §2, Standing Guidelines).
 *
 * @param {import('@reduxjs/toolkit/query/react').BaseQueryFn} args - The endpoint request args.
 * @param {import('@reduxjs/toolkit/query/react').BaseQueryApi} api - The RTK Query API object.
 * @param {object} extraOptions - Endpoint extra options.
 * @returns {Promise<import('@reduxjs/toolkit/query/react').QueryReturnValue>} The query result.
 */
async function baseQueryWithReauth(args, api, extraOptions) {
  const baseQuery = fetchBaseQuery({ baseUrl: API_CONFIG.VITE_API_BASE_URL, credentials: 'include' });
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401 && !AUTH_NO_REFRESH_PATHS.includes(args.url)) {
    if (!refreshPromise) {
      refreshPromise = baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions).finally(() => {
        refreshPromise = null;
      });
    }
    const refreshResult = await refreshPromise;
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
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
