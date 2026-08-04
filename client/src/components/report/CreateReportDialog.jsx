/**
 * @module components/report/CreateReportDialog
 */

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Close from "@mui/icons-material/Close";
import Storefront from "@mui/icons-material/Storefront";
import { toast } from "react-toastify";

import MuiButton from "../reusable/MuiButton.jsx";
import MuiDatePicker from "../reusable/MuiDatePicker.jsx";
import MuiDialog from "../reusable/MuiDialog.jsx";
import MuiTimePicker from "../reusable/MuiTimePicker.jsx";
import BranchSelectorDialog from "./BranchSelectorDialog.jsx";
import {
  formatEthiopianDateLong,
  gregorianToEthiopian,
} from "../../utils/ethiopianDate.js";
import { useCreateReportMutation } from "../../redux/features/reportSlice.js";

/** @type {string} Twelve-hour time format matching `Report.clockIn`/`clockOut` (`## Data Modeling` §4.1). */
const TIME_FORMAT = "hh:mm A";

/**
 * Phase 3 metadata-only create dialog (user decision): date, branches via
 * BranchSelectorDialog, global clockIn/clockOut. The audio recorder and
 * per-branch times arrive with Phase 4 (`## UI/UX Spec` §11). Closes only
 * via Cancel or a successful submit. The footer buttons live in the MuiDialog
 * `actions` slot (fixed row behind a divider, same pattern as
 * ReportFilterDialog), so the content scrolls independently inside the
 * 400px DialogContent cap (`## MUI Component Standards` §5); the Submit
 * button reaches the form via `form="create-report-form"` — the form is
 * `id="create-report-form"` on the content.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Dialog visibility.
 * @param {() => void} props.onClose - Close handler.
 * @returns {JSX.Element} The create report dialog.
 */
function CreateReportDialog({ open, onClose }) {
  const [createReport, { isLoading }] = useCreateReportMutation();
  const [branches, setBranches] = useState([]);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const { control, handleSubmit, reset, setError, getValues, formState } =
    useForm({
      mode: "onBlur",
      defaultValues: { date: null, clockIn: null, clockOut: null },
    });

  const handleClose = () => {
    reset({ date: null, clockIn: null, clockOut: null });
    setBranches([]);
    onClose();
  };

  const handleSubmitReport = handleSubmit(async (values) => {
    if (branches.length === 0) {
      setError("branches", {
        type: "manual",
        message: "Select at least one branch",
      });
      return;
    }
    const ethiopianDate = gregorianToEthiopian(
      values.date.year(),
      values.date.month() + 1,
      values.date.date(),
    );
    try {
      await createReport({
        date: formatEthiopianDateLong(ethiopianDate),
        branches: branches.map((branch) => ({ branchId: branch.branchId })),
        clockIn: values.clockIn.format(TIME_FORMAT),
        clockOut: values.clockOut.format(TIME_FORMAT),
      }).unwrap();
      toast.success("Report created");
      handleClose();
    } catch (error) {
      const errors = error.data?.data?.errors;
      if (errors) {
        errors.forEach((item) =>
          setError(item.field ?? "root", {
            type: "server",
            message: item.message,
          }),
        );
      }
    }
  });

  return (
    <MuiDialog
      open={open}
      // MUI v9 removed `disableEscapeKeyDown`; the no-op onClose already
      // blocks Escape and backdrop close (Modal calls onClose with
      // "escapeKeyDown"/"backdropClick", which this handler ignores), so the
      // dialog closes only via Cancel or a successful submit (## UI/UX Spec
      // §11).
      onClose={() => undefined}
      title="Create New Report"
      maxWidth="sm"
      fullScreen={false}
      sx={{ "& .MuiPaper-root": { m: 1, py: 1 } }}
      actions={
        <>
          <MuiButton
            variant="outlined"
            onClick={handleClose}
            sx={{ flexShrink: 0 }}
          >
            Cancel
          </MuiButton>
          <MuiButton
            type="submit"
            variant="contained"
            loading={isLoading}
            form="create-report-form"
            sx={{ flexShrink: 0 }}
          >
            Submit
          </MuiButton>
        </>
      }
    >
      <form id="create-report-form" onSubmit={handleSubmitReport} noValidate>
        <Grid container spacing={2} sx={{ px: 1, py: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Controller required: the DatePicker delivers a custom onChange value (`## React Hook Form Standards` §3). */}
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field, fieldState }) => (
                <MuiDatePicker
                  {...field}
                  label="Date"
                  fullWidth
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MuiButton
              variant="outlined"
              fullWidth
              startIcon={<Storefront />}
              onClick={() => setSelectorOpen(true)}
              sx={{ flexShrink: 0 }}
            >
              Select Branches
            </MuiButton>
            {formState.errors.branches ? (
              <Typography
                variant="caption"
                color="error.main"
                sx={{ display: "block", mt: 0.5 }}
              >
                {formState.errors.branches.message}
              </Typography>
            ) : null}
          </Grid>
          {branches.map((branch) => (
            <Grid key={branch.branchId} size={{ xs: 12, md: 6 }}>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {branch.name}
                </Box>
                <IconButton
                  aria-label={`Remove ${branch.name}`}
                  size="small"
                  onClick={() =>
                    setBranches((previous) =>
                      previous.filter(
                        (item) => item.branchId !== branch.branchId,
                      ),
                    )
                  }
                >
                  <Close fontSize="small" />
                </IconButton>
              </Typography>
            </Grid>
          ))}
          {branches.length > 0 ? (
            <Grid size={12}>
              <Divider />
            </Grid>
          ) : null}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Controller required: the TimePicker delivers a custom onChange value (`## React Hook Form Standards` §3). */}
            <Controller
              name="clockIn"
              control={control}
              rules={{ required: "Start time is required" }}
              render={({ field, fieldState }) => (
                <MuiTimePicker
                  {...field}
                  label="Clock In"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Controller required: the TimePicker delivers a custom onChange value (`## React Hook Form Standards` §3). */}
            <Controller
              name="clockOut"
              control={control}
              rules={{
                required: "End time is required",
                validate: (value) => {
                  const clockIn = getValues("clockIn");
                  return (
                    !value ||
                    !clockIn ||
                    value.isAfter(clockIn) ||
                    "End time must be after start time"
                  );
                },
              }}
              render={({ field, fieldState }) => (
                <MuiTimePicker
                  {...field}
                  label="Clock Out"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
      <BranchSelectorDialog
        open={selectorOpen}
        selected={branches}
        onApply={(nextBranches) => {
          setBranches(nextBranches);
          setSelectorOpen(false);
        }}
        onClose={() => setSelectorOpen(false)}
      />
    </MuiDialog>
  );
}

CreateReportDialog.displayName = "CreateReportDialog";

export default CreateReportDialog;
