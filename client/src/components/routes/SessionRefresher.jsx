/**
 * @module components/routes/SessionRefresher
 */

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRefreshMutation } from '../../redux/features/authSlice.js';
import { SESSION_REFRESH_INTERVAL_MS } from '../../utils/constants.js';

/**
 * Proactive session guard. The access-token cookie expires (~15 minutes,
 * `backend/config/env.js` `JWT_ACCESS_EXPIRES_IN`); while the reactive
 * 401 → refresh path (`redux/features/api.js`) recovers from expiry on the
 * next request, an idle user hitting a page after expiry used to be kicked
 * out. This component issues a silent `POST /auth/refresh` on an interval so
 * the refresh cookie keeps the access cookie fresh before it expires.
 *
 * It renders nothing; it mounts under `ProtectedRoute` (covers every
 * protected page, including `/assistant` which bypasses `AppShell`). Failures
 * are swallowed deliberately — a transient blip must never log the user out;
 * the reactive reauth path handles genuinely dead sessions.
 *
 * @returns {null} Renders nothing.
 */
function SessionRefresher() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      // Silent, fire-and-forget: success keeps the cookies fresh; failure is
      // handled later by `baseQueryWithReauth`/'fetchWithReauth` on need.
      refresh().catch(() => {});
    }, SESSION_REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isAuthenticated, refresh]);

  return null;
}

SessionRefresher.displayName = 'SessionRefresher';

export default SessionRefresher;