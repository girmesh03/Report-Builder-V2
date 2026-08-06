/**
 * @module utils/fetchWithReauth
 */

import { getAuthRefreshPromise } from './authRefresh.js';
import { API_CONFIG, AUTH_NO_REFRESH_PATHS } from './constants.js';

/**
 * Plain-fetch wrapper with cookie-aware 401 → refresh → retry (the same
 * contract as the RTK `baseQueryWithReauth`, `redux/features/api.js`).
 *
 * The assistant chat adapter performs raw `fetch` calls (SSE stream, message
 * history, tool approvals) that bypass RTK Query entirely
 * (`components/assistant/chatAdapter.js`). Those calls must participate in
 * the session-refresh system too, otherwise an expired access token silently
 * errors out the chat instead of transparently refreshing (review finding —
 * "the refresh token system doesn't work on the assistant").
 *
 * Behavior:
 * - On a 401 for a non-auth path, it awaits the shared serialized refresh
 *   (see `utils/authRefresh.js`), then retries the original request once.
 * - The refresh and the retry share the same mutex as the RTK path, so there
 *   is a single in-flight `/auth/refresh` across the whole app.
 * - After a definitive refresh failure the 401 response is returned
 *   unchanged; the caller decides how to surface it (the page/chat layer
 *   still works, it just surfaces the server error).
 *
 * @param {string} path - The request path (e.g. `/assistant/…`) or absolute URL.
 * @param {RequestInit} [init] - Fetch options.
 * @returns {Promise<Response>} The (possibly retried) fetch response.
 */
export async function fetchWithReauth(path, init = {}) {
  const baseUrl = API_CONFIG.VITE_API_BASE_URL;
  const fullUrl = path.startsWith('http') ? path : `${baseUrl}${path}`;
  const noRefreshPath = AUTH_NO_REFRESH_PATHS.some(
    (excluded) => fullUrl === `${baseUrl}${excluded}` || fullUrl.endsWith(excluded),
  );

  const doFetch = (options) =>
    fetch(fullUrl, { ...options, credentials: 'include' });

  let response = await doFetch(init);
  if (response.status === 401 && !noRefreshPath) {
    const refresh = await getAuthRefreshPromise(baseUrl);
    if (refresh.ok) {
      response = await doFetch(init);
    }
  }
  return response;
}