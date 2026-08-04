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
 * RHF integration requires the `Controller` wrapper (`## MUI Component
 * Standards` §9.9).
 *
 * @param {Object} props - All standard MUI TimePicker props pass through.
 * @returns {JSX.Element} The MUI time picker.
 */
const MuiTimePicker = forwardRef(function MuiTimePicker(
  { format = "hh:mm A", slotProps, ...rest },
  ref,
) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const commonProps = {
    ref,
    format,
    slotProps: {
      ...slotProps,
      textField: { size: "small", fullWidth: true, ...slotProps?.textField },
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
