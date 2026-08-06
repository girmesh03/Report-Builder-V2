/**
 * @module App
 */

import { Suspense } from "react";
import { Outlet } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";

import AppTheme from "./theme/AppTheme.jsx";
import AppErrorBoundary from "./components/layout/AppErrorBoundary.jsx";
import AppToastContainer from "./components/layout/AppToastContainer.jsx";
import LoadingSpinner from "./components/reusable/LoadingSpinner.jsx";

/**
 * Root layout: AppTheme, CssBaseline, AppErrorBoundary, AppToastContainer,
 * and the router `<Outlet />` (REQ-094). The lazy-loaded pages render under
 * a `<Suspense>` fallback (full-page LoadingSpinner) so route changes show
 * immediate loading feedback while the page chunk loads (§12.1, §12.6).
 * Never defines routes.
 *
 * @returns {JSX.Element} The app root layout.
 */
function App() {
  return (
    <AppTheme>
      <CssBaseline />
      <AppErrorBoundary>
        <AppToastContainer />
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </AppErrorBoundary>
    </AppTheme>
  );
}

App.displayName = "App";

export default App;
