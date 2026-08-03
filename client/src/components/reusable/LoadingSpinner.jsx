/**
 * @module components/reusable/LoadingSpinner
 */

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

/**
 * Centered full-page or full-section loading indicator (1.10).
 *
 * @param {Object} props - Component props.
 * @param {string} [props.message] - Optional muted text beneath the spinner.
 * @param {number} [props.size] - CircularProgress size.
 * @param {string | number} [props.minHeight] - Wrapper min-height.
 * @returns {JSX.Element} The loading spinner.
 */
function LoadingSpinner({ message, size = 40, minHeight = '100vh' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight,
      }}
    >
      <CircularProgress size={size} />
      {message ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      ) : null}
    </Box>
  );
}

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
