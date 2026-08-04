/**
 * @module components/reusable/MuiEmptyState
 */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Inbox from '@mui/icons-material/Inbox';

/**
 * Reusable empty-state presentation (1.14): centered icon in a soft circle,
 * "No {resource} yet" headline, optional muted subtitle and action. Used by
 * MuiDataGrid's `noRowsOverlay` (dense variant) and by pages for list views
 * and future sections (`## UI/UX Spec` §3.6 empty states).
 *
 * @param {Object} props - Component props.
 * @param {string} props.resource - Resource name shown in the headline ("No {resource} yet") — required.
 * @param {string} [props.subtitle] - Optional muted text beneath the headline.
 * @param {React.ReactNode} [props.action] - Optional action element (e.g. a Create button).
 * @param {React.ReactNode} [props.icon] - Optional custom icon (default: Inbox).
 * @param {boolean} [props.dense] - Compact variant for viewport overlays (smaller icon and padding).
 * @param {string | number} [props.minHeight] - Wrapper min-height.
 * @param {object} [props.sx] - Additional Box sx overrides.
 * @returns {JSX.Element} The empty state.
 */
function MuiEmptyState({ resource, subtitle, action, icon, dense = false, minHeight = '320px', sx }) {
  const iconSize = dense ? 40 : 72;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: dense ? 1 : 1.5,
        minHeight,
        px: 2,
        textAlign: 'center',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: iconSize,
          height: iconSize,
          borderRadius: '50%',
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          color: 'text.disabled',
        }}
      >
        {icon ?? <Inbox fontSize={dense ? 'medium' : 'large'} />}
      </Box>
      <Typography variant={dense ? 'subtitle1' : 'h6'} sx={{ fontWeight: 600 }}>
        No {resource} yet
      </Typography>
      {subtitle ? (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      ) : null}
      {action ? <Box sx={{ mt: dense ? 0.5 : 1 }}>{action}</Box> : null}
    </Box>
  );
}

MuiEmptyState.displayName = 'MuiEmptyState';

export default MuiEmptyState;
