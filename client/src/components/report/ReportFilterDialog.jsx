/**
 * @module components/report/ReportFilterDialog
 */

import { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Clear from "@mui/icons-material/Clear";
import Storefront from "@mui/icons-material/Storefront";

import MuiButton from "../reusable/MuiButton.jsx";
import MuiDatePicker from "../reusable/MuiDatePicker.jsx";
import MuiDialog from "../reusable/MuiDialog.jsx";
import MuiTextField from "../reusable/MuiTextField.jsx";
import { PAGINATION_MAX_LIMIT } from "../../utils/constants.js";
import { useListBranchesQuery } from "../../redux/features/branchSlice.js";

/**
 * Reports filter dialog (`## UI/UX Spec` §10): row 1 — MuiDatePicker +
 * single-branch select; row 2 — "Archived" switch. The dialog is centered
 * on all viewports (`fullScreen={false}` — the filter dialog never takes
 * over the screen) with the shared paper treatment
 * `sx={{ "& .MuiPaper-root": { m: 1, py: 1 } }}`; DialogContent is `p: 0`
 * with a 400px scroll cap (`## MUI Component Standards` §5), so the grid
 * restores the inset with `px: 1, py: 2`. Fields stack fullwidth on
 * portrait phones (< 600px) and sit side by side from 600px up (mobile
 * landscape included). The date picker carries a ClearIcon end adornment;
 * the branch select clears via the adjacent IconButton (MuiSelect cannot
 * render input adornments — Phase 3 note). Branches are fetched only while
 * the dialog is open (`skip: !open`) so navigating to the Reports page
 * issues a single `GET /reports` request. The three drafts re-sync from
 * the `filters` prop on every false→true `open` transition (render-time
 * `prevOpen` pattern, same as BranchSelectorDialog — the dialog is
 * permanently mounted, so mount-time `useState` initializers alone would
 * show stale defaults on reopen). Cancel resets every filter;
 * Apply commits and closes.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Dialog visibility.
 * @param {Object} props.filters - Current filters.
 * @param {dayjs.Dayjs | null} props.filters.date - Date filter.
 * @param {string} props.filters.branchId - Branch filter ('' = none).
 * @param {boolean} props.filters.isArchived - Archived-only toggle.
 * @param {(filters: { date: dayjs.Dayjs | null, branchId: string, isArchived: boolean }) => void} props.onApply - Apply handler.
 * @param {() => void} props.onClose - Close handler.
 * @returns {JSX.Element} The filter dialog.
 */
function ReportFilterDialog({ open, filters, onApply, onClose }) {
  const { data } = useListBranchesQuery(
    { page: 1, limit: PAGINATION_MAX_LIMIT, search: "" },
    { skip: !open },
  );
  const [draftDate, setDraftDate] = useState(filters.date);
  const [draftBranchId, setDraftBranchId] = useState(filters.branchId);
  const [draftArchived, setDraftArchived] = useState(filters.isArchived);

  const [prevOpen, setPrevOpen] = useState(open);
  if (open && !prevOpen) {
    setPrevOpen(open);
    setDraftDate(filters.date);
    setDraftBranchId(filters.branchId);
    setDraftArchived(filters.isArchived);
  }

  const resetToDefaults = () => {
    setDraftDate(null);
    setDraftBranchId("");
    setDraftArchived(false);
  };

  const handleCancel = () => {
    resetToDefaults();
    onApply({ date: null, branchId: "", isArchived: false });
    onClose();
  };

  const handleApply = () => {
    onApply({
      date: draftDate,
      branchId: draftBranchId,
      isArchived: draftArchived,
    });
    onClose();
  };

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      title="Filter Reports"
      fullScreen={false}
      maxWidth="sm"
      sx={{ "& .MuiPaper-root": { m: 1, py: 1 } }}
      actions={
        <>
          <MuiButton
            variant="outlined"
            onClick={handleCancel}
            sx={{ flexShrink: 0 }}
          >
            Cancel
          </MuiButton>
          <MuiButton
            variant="contained"
            onClick={handleApply}
            sx={{ flexShrink: 0 }}
          >
            Apply
          </MuiButton>
        </>
      }
    >
      <Grid container spacing={2} sx={{ px: 1, py: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MuiDatePicker
            label="Date"
            value={draftDate}
            onChange={setDraftDate}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Clear date filter"
                      size="small"
                      onClick={() => setDraftDate(null)}
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MuiTextField
            select
            label="Branch"
            value={draftBranchId}
            onChange={(event) => setDraftBranchId(event.target.value)}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Storefront fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Clear branch filter"
                      size="small"
                      onClick={() => setDraftBranchId("")}
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
              select: {
                MenuProps: { slotProps: { paper: { sx: { maxHeight: 300 } } } },
              },
            }}
          >
            <MenuItem value="">
              <em>All branches</em>
            </MenuItem>
            {(data?.docs ?? []).map((branch) => (
              <MenuItem key={branch._id} value={branch._id}>
                {branch.name}
              </MenuItem>
            ))}
          </MuiTextField>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Switch
                checked={draftArchived}
                onChange={(event) => setDraftArchived(event.target.checked)}
              />
            }
            label="Archived"
            labelPlacement="start"
          />
        </Grid>
      </Grid>
    </MuiDialog>
  );
}

ReportFilterDialog.displayName = "ReportFilterDialog";

export default ReportFilterDialog;
