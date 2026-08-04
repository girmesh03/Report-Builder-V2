/**
 * @module components/reusable/MuiPageHeader
 */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Consistent one-line page header for protected pages (1.12): title +
 * subtitle on the left, action elements in the right slot. The subtitle is
 * hidden on viewport widths below 600px in portrait (`## UI/UX Spec` §12.6,
 * `## MUI Component Standards` §4).
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Page title (required).
 * @param {string} [props.subtitle] - Page subtitle (hidden below 600px portrait).
 * @param {React.ReactNode} [props.children] - Right-slot action elements.
 * @returns {JSX.Element} The page header.
 */
function MuiPageHeader({ title, subtitle, children }) {
  const isSmallPortrait = useMediaQuery('(max-width:599.95px) and (orientation: portrait)');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        borderBottom: 1,
        borderColor: 'divider',
        pb: 1.5,
        gap: 2,
        flexWrap: 'nowrap',
      }}
    >
      <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
        <Typography variant="h5" component="h1" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {title}
        </Typography>
        {subtitle && !isSmallPortrait ? (
          <Typography variant="body2" color="text.secondary" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>{children}</Box>
    </Box>
  );
}

MuiPageHeader.displayName = 'MuiPageHeader';

export default MuiPageHeader;
