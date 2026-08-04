/**
 * @module components/reusable/MuiConfirmDialog
 */

import MuiDialog from "./MuiDialog.jsx";
import MuiButton from "./MuiButton.jsx";

/**
 * Preset confirmation dialog built on MuiDialog (1.9) for destructive and
 * state-changing actions (archive/restore/delete and other confirm/dismiss
 * scenarios) (`## MUI Component Standards` §5).
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Dialog visibility.
 * @param {() => void} props.onClose - Dismiss handler.
 * @param {() => void} props.onConfirm - Confirm action handler.
 * @param {string} props.title - Dialog title (e.g. "Delete Report").
 * @param {string} props.message - Confirmation message.
 * @param {string} [props.confirmText] - Confirm button label (default "Confirm").
 * @param {string} [props.cancelText] - Cancel button label (default "Cancel").
 * @param {string} [props.confirmColor] - Confirm button color (default "primary"; "error" for delete).
 * @param {boolean} [props.confirmLoading] - Loading state on the confirm button (async confirms).
 * @returns {JSX.Element} The confirmation dialog.
 */
function MuiConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "primary",
  confirmLoading = false,
}) {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="xs"
      disableEnforceFocus={true}
      disableRestoreFocus={true}
      actions={
        <>
          <MuiButton
            variant="outlined"
            onClick={onClose}
            sx={{ flexShrink: 0 }}
          >
            {cancelText}
          </MuiButton>
          <MuiButton
            variant="contained"
            color={confirmColor}
            onClick={onConfirm}
            loading={confirmLoading}
            sx={{ flexShrink: 0 }}
          >
            {confirmText}
          </MuiButton>
        </>
      }
    >
      {message}
    </MuiDialog>
  );
}

MuiConfirmDialog.displayName = "MuiConfirmDialog";

export default MuiConfirmDialog;
