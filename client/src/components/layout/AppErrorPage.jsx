/**
 * @module components/layout/AppErrorPage
 */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MuiButton from '../reusable/MuiButton.jsx';

/**
 * Route-level error fallback rendered by the router `ErrorBoundary` slot:
 * a centered message and a reload action.
 *
 * @returns {JSX.Element} The error page.
 */
function AppErrorPage() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h5">Something went wrong</Typography>
      <Typography variant="body2" color="text.secondary">
        Please reload the page to continue.
      </Typography>
      <MuiButton variant="contained" onClick={() => window.location.reload()}>
        Reload
      </MuiButton>
    </Box>
  );
}

AppErrorPage.displayName = 'AppErrorPage';

export default AppErrorPage;
