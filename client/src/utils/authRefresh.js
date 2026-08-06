/**
 * @module utils/authRefresh
 */

/**
 * Shared, serialized session-refresh helper.
 *
 * The RTK Query `baseQueryWithReauth` (`redux/features/api.js`) and the plain
 * `fetchWithReauth` helper (`utils/fetchWithReauth.js`) both call
 * `POST <base>/auth/refresh` when they see a 401. The in-flight promise lives
 * here so concurrent refreshes from BOTH paths collapse into a single
 * network call (refresh-rotation race fix — a consumed refresh token must
 * never be replayed twice).
 *
 * @param {string} baseUrl - The API base URL (`API_CONFIG.VITE_API_BASE_URL`).
 * @returns {Promise<{ ok: boolean, status: number }>} The refresh result.
 */
let refreshPromise = null;

/**
 * Runs the serialized refresh request. Concurrent callers share one promise;
 * the cookie write-backs are handled by the browser so every caller simply
 * awaits completion and then retries its own request.
 *
 * @param {string} baseUrl - The API base URL.
 * @returns {Promise<{ ok: boolean, status: number }>} The refresh result.
 */
function getAuthRefreshPromise(baseUrl) {
  if (!refreshPromise) {
    refreshPromise = fetch(`${baseUrl}/auth/refresh`, { method: 'POST', credentials: 'include' })
      .then(async (response) => ({ ok: response.ok, status: response.status }))
      .catch(() => ({ ok: false, status: 0 }))
      .finally(() => {
        refreshPromise = null;
    });
  }
  return refreshPromise;
}

export { getAuthRefreshPromise };