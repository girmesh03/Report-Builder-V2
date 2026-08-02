/**
 * @module App
 */

import { Outlet } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';

import AppTheme from './theme/AppTheme.jsx';
import AppErrorBoundary from './components/layout/AppErrorBoundary.jsx';
import AppToastContainer from './components/layout/AppToastContainer.jsx';

/**
 * Root layout: AppTheme, CssBaseline, AppErrorBoundary, AppToastContainer,
 * and the router `<Outlet />` (REQ-094). Never defines routes.
 *
 * @returns {JSX.Element} The app root layout.
 */
function App() {
  return (
    <AppTheme>
      <CssBaseline />
      <AppErrorBoundary>
        <AppToastContainer />
        <Outlet />
      </AppErrorBoundary>
    </AppTheme>
  );
}

App.displayName = 'App';

export default App;
