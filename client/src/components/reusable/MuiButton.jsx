/**
 * @module components/reusable/MuiButton
 */

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Pure wrapper around MUI Button with safe defaults (1.2): `size="small"`,
 * native `loading` with a 20px CircularProgress indicator at center.
 * Presentation wrapper — no `forwardRef`.
 *
 * @param {Object} props - All standard MUI Button props pass through.
 * @returns {JSX.Element} The MUI button.
 */
function MuiButton(props) {
  return (
    <Button
      {...props}
      size={props.size ?? 'small'}
      loadingIndicator={props.loadingIndicator ?? <CircularProgress size={20} />}
      loadingPosition={props.loadingPosition ?? 'center'}
    />
  );
}

MuiButton.displayName = 'MuiButton';

export default MuiButton;
