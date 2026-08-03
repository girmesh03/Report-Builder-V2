/**
 * @module components/routes/PublicRoute
 */

import { Navigate, Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

/**
 * Inverse route guard (12.4, REQ-095): redirects authenticated users to
 * `/dashboard` except on the Landing page (`/`), which stays viewable —
 * `/login`, `/register`, and any future public pages remain blocked for
 * authenticated users.
 *
 * @returns {JSX.Element} The guarded outlet or a redirect.
 */
function PublicRoute() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (isAuthenticated && location.pathname !== '/') {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}

PublicRoute.displayName = 'PublicRoute';

export default PublicRoute;
