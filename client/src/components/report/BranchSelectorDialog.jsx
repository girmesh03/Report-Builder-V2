/**
 * @module components/report/BranchSelectorDialog
 */

import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MuiButton from '../reusable/MuiButton.jsx';
import MuiDialog from '../reusable/MuiDialog.jsx';
import MuiEmptyState from '../reusable/MuiEmptyState.jsx';
import LoadingSpinner from '../reusable/LoadingSpinner.jsx';
import { PAGINATION_MAX_LIMIT } from '../../utils/constants.js';
import { useListBranchesQuery } from '../../redux/features/branchSlice.js';

/**
 * Branch multi-select dialog (`## UI/UX Spec` §11 CreateReportDialog): a
 * MuiList of MuiListItems with a checkbox, branch name, and location
 * secondary text; Cancel + Apply footer; the list comes from
 * `GET /api/v1/branches` via Redux, fetched only while the dialog is open
 * (`skip: !open`) so navigating to the Reports page issues a single
 * `GET /reports` request; already-selected branches pre-checked;
 * unchecking removes them on Apply. When the fetch finishes with no
 * branches at all, a MuiEmptyState (no action) fills the list area — a
 * create button is never offered here, creation lives on the Branches
 * page. The paper gets `m: 1, py: 1` and the list `p: 1` because
 * DialogContent is `p: 0` with a 400px scroll cap (`## MUI Component
 * Standards` §5). Branch identity is the Mongo `_id` throughout
 * (checkboxes, keys, and the `branchId` sent to the API — DM-03 strips the
 * `id` virtual, so API docs never carry `id`).
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Dialog visibility.
 * @param {Array<{ branchId: string, name: string }>} props.selected - Currently selected branches.
 * @param {(branches: Array<{ branchId: string, name: string }>) => void} props.onApply - Apply handler with the new selection.
 * @param {() => void} props.onClose - Close handler.
 * @returns {JSX.Element} The branch selector dialog.
 */
function BranchSelectorDialog({ open, selected, onApply, onClose }) {
  const { data, isFetching } = useListBranchesQuery(
    { page: 1, limit: PAGINATION_MAX_LIMIT, search: '' },
    { skip: !open },
  );
  const [checkedIds, setCheckedIds] = useState(() => new Set(selected.map((branch) => branch.branchId)));

  const [prevOpen, setPrevOpen] = useState(open);
  if (open && !prevOpen) {
    setPrevOpen(open);
    setCheckedIds(new Set(selected.map((branch) => branch.branchId)));
  }

  const handleToggle = (branchId) => {
    setCheckedIds((previous) => {
      const next = new Set(previous);
      if (next.has(branchId)) {
        next.delete(branchId);
      } else {
        next.add(branchId);
      }
      return next;
    });
  };

  const handleApply = () => {
    const branches = (data?.docs ?? [])
      .filter((branch) => checkedIds.has(branch._id))
      .map((branch) => ({ branchId: branch._id, name: branch.name }));
    onApply(branches);
  };

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      title="Select Branches"
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiPaper-root": { m: 1, py: 1 } }}
      actions={
        <>
          <MuiButton variant="outlined" onClick={onClose} sx={{ flexShrink: 0 }}>
            Cancel
          </MuiButton>
          <MuiButton variant="contained" onClick={handleApply} sx={{ flexShrink: 0 }}>
            Apply
          </MuiButton>
        </>
      }
    >
      {isFetching ? (
        <LoadingSpinner minHeight="200px" />
      ) : !(data?.docs?.length) ? (
        <MuiEmptyState resource="branches" dense minHeight="200px" />
      ) : (
        <List dense disablePadding sx={{ p: 1 }}>
          {(data?.docs ?? []).map((branch) => (
            <ListItem key={branch._id} disablePadding>
              <ListItemButton dense onClick={() => handleToggle(branch._id)}>
                <Checkbox edge="start" checked={checkedIds.has(branch._id)} tabIndex={-1} disableRipple />
                <ListItemText primary={branch.name} secondary={branch.location || undefined} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </MuiDialog>
  );
}

BranchSelectorDialog.displayName = 'BranchSelectorDialog';

export default BranchSelectorDialog;
