/**
 * @module components/layout/PublicLayout
 */

import { Outlet } from 'react-router';
import Box from '@mui/material/Box';

import MuiAppbar from '../reusable/MuiAppbar.jsx';

/**
 * Root-level wrapper for public routes (2.1): fixed public MuiAppbar plus a
 * scrollable content area; outer container is `height: 100vh; overflow:
 * hidden` (REQ-096). No sidebar, no auth gating.
 *
 * @returns {JSX.Element} The public layout.
 */
function PublicLayout() {
  return (
    <Box sx={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <MuiAppbar variant="public" position="fixed" />
      <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto', marginTop: { xs: 7, sm: 8 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}

PublicLayout.displayName = 'PublicLayout';

export default PublicLayout;
