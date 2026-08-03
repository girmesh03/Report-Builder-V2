/**
 * @module components/routes/ProtectedRoute
 */

import { Navigate, Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

import { useGetMeQuery } from '../../redux/features/authSlice.js';
import LoadingSpinner from '../reusable/LoadingSpinner.jsx';

/**
 * Route guard for authenticated pages (12.4, REQ-095): shows a spinner while
 * the session is initializing, calls `GET /api/v1/auth/me` on mount, and
 * redirects unauthenticated users to `/login` preserving `state.from`.
 *
 * @returns {JSX.Element} The guarded outlet or a redirect.
 */
function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, initializing } = useSelector((state) => state.auth);
  const { isFetching } = useGetMeQuery();

  if (initializing || isFetching) {
    return <LoadingSpinner message="Checking session..." />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

ProtectedRoute.displayName = 'ProtectedRoute';

export default ProtectedRoute;
