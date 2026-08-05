/**
 * @module components/reusable/MuiTimePicker
 */

import { forwardRef } from "react";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/**
 * Responsive time picker (9.9): DesktopTimePicker on md+ (popper) and
 * MobileTimePicker below md (dialog), switched explicitly via
 * `theme.breakpoints.up('md')`; `format="hh:mm A"` matches the 12-hour
 * string contract of `Report.clockIn`/`clockOut` (`## Data Modeling` §4.1).
 * `error`/`helperText` are extracted and merged into the `textField` slot —
 * the MUI X pickers have no top-level helperText handling, so without this
 * the props leaked as unknown props and per-branch validation was invisible
 * (F-4-01). RHF integration requires the `Controller` wrapper (`## MUI
 * Component Standards` §9.9).
 *
 * @param {Object} props - All standard MUI TimePicker props pass through; `error`/`helperText` land on the field slot.
 * @returns {JSX.Element} The MUI time picker.
 */
const MuiTimePicker = forwardRef(function MuiTimePicker(
  { format = "hh:mm A", slotProps, error, helperText, ...rest },
  ref,
) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const commonProps = {
    ref,
    format,
    slotProps: {
      ...slotProps,
      textField: { size: "small", fullWidth: true, error, helperText, ...slotProps?.textField },
    },
    ...rest,
  };

  return isDesktop ? (
    <DesktopTimePicker {...commonProps} />
  ) : (
    <MobileTimePicker {...commonProps} />
  );
});

MuiTimePicker.displayName = "MuiTimePicker";

export default MuiTimePicker;
