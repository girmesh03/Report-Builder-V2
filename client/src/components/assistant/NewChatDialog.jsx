/**
 * @module components/assistant/NewChatDialog
 */

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import QuestionAnswer from '@mui/icons-material/QuestionAnswer';
import Typography from '@mui/material/Typography';

import LoadingSpinner from '../reusable/LoadingSpinner.jsx';
import MuiButton from '../reusable/MuiButton.jsx';
import MuiStatusBadge from '../reusable/MuiStatusBadge.jsx';
import { PAGINATION_MAX_LIMIT } from '../../utils/constants.js';
import { useListReportsQuery } from '../../redux/features/reportSlice.js';

/**
 * "New Chat" dialog (`docs/initial-doc.md` §3.5.2 + free-chat follow-up):
 * starts a report-less free conversation, or lists the user's reports to
 * start/jump to a report-bound chat (the parent find-or-creates it via
 * `POST /assistant/conversations`). Reports already linked to a conversation
 * simply select the existing one, so the dialog doubles as a "jump to a
 * report's chat" surface.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Dialog visibility.
 * @param {() => void} props.onClose - Close handler.
 * @param {() => void} props.onFreeChat - Free conversation start handler.
 * @param {(report: Object) => void} props.onSelect - Report selection handler.
 * @returns {JSX.Element} The dialog.
 */
function NewChatDialog({ open, onClose, onFreeChat, onSelect }) {
  const { data, isFetching } = useListReportsQuery({
    page: 1,
    limit: PAGINATION_MAX_LIMIT,
  });
  const existing = data?.docs ?? [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>New Chat</DialogTitle>
      <DialogContent dividers>
        <MuiButton
          variant="outlined"
          fullWidth
          startIcon={<QuestionAnswer />}
          onClick={onFreeChat}
          sx={{ mb: 2 }}
        >
          Start a free conversation
        </MuiButton>
        {isFetching && !data ? (
          <LoadingSpinner minHeight="160px" />
        ) : (
          <>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Or pick a report
            </Typography>
            {existing.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                No reports yet. Create a report to start chatting with the Assistant.
              </Typography>
            ) : (
              <List dense disablePadding>
                {existing.map((report) => (
                  <ListItemButton
                    key={report._id}
                    onClick={() => onSelect(report)}
                    sx={{ borderRadius: 1, mb: 0.5 }}
                  >
                    <ListItemText
                      primary={report.date}
                      secondary={
                        report.branches.map((branch) => branch.branchId?.name ?? '').join(', ') ||
                        'No branches'
                      }
                    />
                    <MuiStatusBadge status={report.status} />
                  </ListItemButton>
                ))}
              </List>
            )}
          </>
        )}
        <Divider sx={{ my: 1 }} />
        <MuiButton variant="text" onClick={onClose} sx={{ alignSelf: 'flex-end' }}>
          Cancel
        </MuiButton>
      </DialogContent>
    </Dialog>
  );
}

NewChatDialog.displayName = 'NewChatDialog';

export default NewChatDialog;