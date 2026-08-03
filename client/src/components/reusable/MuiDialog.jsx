/**
 * @module components/reusable/MuiDialog
 */

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

/**
 * Structural wrapper providing the common dialog skeleton (1.3): title bar
 * with bottom divider, scrollable content, and an actions row behind a
 * divider — with responsive fullscreen. Always used instead of raw
 * `@mui/material/Dialog`.
 *
 * @param {Object} props - `title`, `children`, `actions`, `contentSx` plus all standard MUI Dialog props.
 * @returns {JSX.Element} The MUI dialog.
 */
function MuiDialog(props) {
  const { title, children, actions, fullScreen, contentSx, disableEnforceFocus = true, disableRestoreFocus = true, ...rest } =
    props;
  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('sm'));
  const isShortLandscape = useMediaQuery(
    `(max-width:${theme.breakpoints.values.md - 0.05}px) and (orientation: landscape)`,
  );
  const responsiveFullscreen = isSmallViewport || isShortLandscape;

  return (
    <Dialog
      {...rest}
      fullScreen={fullScreen ?? responsiveFullscreen}
      disableEnforceFocus={disableEnforceFocus}
      disableRestoreFocus={disableRestoreFocus}
    >
      {title ? (
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>{title}</DialogTitle>
      ) : null}
      <DialogContent sx={{ overflowY: 'auto', ...contentSx }}>{children}</DialogContent>
      {actions ? (
        <>
          <Divider />
          <DialogActions>{actions}</DialogActions>
        </>
      ) : null}
    </Dialog>
  );
}

MuiDialog.displayName = 'MuiDialog';

export default MuiDialog;
