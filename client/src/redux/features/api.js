/**
 * @module redux/features/api
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_CONFIG, AUTH_NO_REFRESH_PATHS, AUTH_STORAGE_KEY } from '../../utils/constants.js';
import { getAuthRefreshPromise } from '../../utils/authRefresh.js';

/**
 * True when the RTK Query error object represents a definitive auth
 * rejection (HTTP 401/403). Network, parsing, timeout, and 5xx errors are
 * NOT auth failures — the session must survive a transient blip.
 *
 * @param {import('@reduxjs/toolkit/query/react').QueryReturnValue} result - The query result.
 * @returns {boolean} True when the error is a hard auth rejection.
 */
function isAuthRejection(result) {
  return Boolean(result?.error?.status === 401 || result?.error?.status === 403);
}

/**
 * Cookie-aware base query wrapper (REQ-104, REQ-105). Behavior:
 *
 * - On HTTP 401 for a non-auth endpoint it awaits the shared serialized
 *   refresh (`utils/authRefresh.js` — single in-flight `/auth/refresh`
 *   app-wide, shared with the raw `fetchWithReauth` path) and retries the
 *   original request once with the refreshed cookies.
 * - **Transient failures never log the user out.** A network/unreachable or
 *   server-side refresh failure (FETCH_ERROR / TIMEOUT_ERROR / 5xx) keeps the
 *   session alive and returns the original error — the RTK
 *   `getMe.matchRejected` elsewhere must only clear auth on a real 401/403.
 * - Only a definitive refresh rejection (HTTP 401/403) clears local storage
 *   and dispatches the logout action, matching the real "session expired"
 *   case (this fixes the observed kick-out on flaky requests).
 * - Auth endpoints are excluded from the refresh retry (`## Redux RTK Query`
 *   §2); `/auth/me` is NOT excluded, so returning from a page revalidates
 *   the session.
 *
 * @param {import('@reduxjs/toolkit/query/react').BaseQueryFn} args - The endpoint request args.
 * @param {import('@reduxjs/toolkit/query/react').BaseQueryApi} api - The RTK Query API object.
 * @param {object} extraOptions - Endpoint extra options.
 * @returns {Promise<import('@reduxjs/toolkit/query/react').QueryReturnValue>} The query result.
 */
async function baseQueryWithReauth(args, api, extraOptions) {
  const baseQuery = fetchBaseQuery({ baseUrl: API_CONFIG.VITE_API_BASE_URL, credentials: 'include' });
  let result = await baseQuery(args, api, extraOptions);
  if (isAuthRejection(result) && !AUTH_NO_REFRESH_PATHS.includes(args.url)) {
    const { ok, status } = await getAuthRefreshPromise(API_CONFIG.VITE_API_BASE_URL);
    if (ok) {
      // Cookies rotated — retry the original request once.
      result = await baseQuery(args, api, extraOptions);
    } else if (status === 401 || status === 403) {
      // Definitive auth rejection (session expired) — clear the session.
      localStorage.removeItem(AUTH_STORAGE_KEY);
      api.dispatch({ type: 'auth/logout' });
    } else {
      // Transient refresh failure (network timeout, server 5xx, etc.).
      // Keep the session and surface a non-auth error so `getMe.matchRejected`
      // (which only wipes on a real 401/403) leaves the user logged in.
      const message = status === 0 ? 'Could not reach the server' : 'Session refresh failed; please try again';
      result = { error: { status, data: { message } } };
    }
  }
  return result;
}

const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export { api, baseQueryWithReauth };
