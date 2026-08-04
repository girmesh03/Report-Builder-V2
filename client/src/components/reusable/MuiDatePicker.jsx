/**
 * @module components/reusable/MuiDatePicker
 */

import { Fragment, useState } from "react";
import dayjs from "dayjs";
import useForkRef from "@mui/utils/useForkRef";
import { usePickerContext } from "@mui/x-date-pickers/hooks";
import { CalendarIcon } from "@mui/x-date-pickers/icons";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import MuiTextField from "./MuiTextField.jsx";
import {
  ethiopianToGregorian,
  formatEthiopianDate,
  gregorianToEthiopian,
  parseEthiopianDate,
} from "../../utils/ethiopianDate.js";
import { DATE_PICKER_OPEN_ARIA_LABEL } from "../../utils/constants.js";

/**
 * Custom `slots.field` for the date pickers that edits Ethiopian dates
 * directly, replacing MUI X's section-based field machinery entirely. The
 * MUI X `useField` hook requires its `textField` slot to render a
 * `PickersSectionList` (it throws at mount otherwise), and its parsing is
 * Gregorian-only — so instead of fighting the machinery, this field reads
 * the picker context (`usePickerContext` — public API, verified v9.9.0)
 * and drives everything itself:
 *
 * - Display: the Gregorian dayjs anchor (`context.value`) is converted with
 *   `gregorianToEthiopian` and shown as DD-MM-YY (`formatEthiopianDate`),
 *   so Tikimt days 29–30 and Pagume month 13 can never roll over.
 * - Typing: `parseEthiopianDate` → `ethiopianToGregorian` → dayjs commit via
 *   `context.setValue` (`changeImportance: "set"` — the popup stays open,
 *   `source: "field"`). Full Ethiopian dates (2- or 4-digit year) are
 *   typeable; partial or invalid text is kept as a draft and discarded on
 *   blur. Enter is swallowed so a valid date never submits the RHF form.
 * - Calendar: opens on input click (adornment buttons excluded) and via the
 *   trailing `CalendarIcon` button (`context.setOpen`); the button follows
 *   `context.triggerStatus` for disabled/hidden states.
 * - Anchor: the native input ref is forked with `context.triggerRef`, the
 *   popper's anchor element.
 *
 * The picker panel stays Gregorian (Phase 3 decision — conversion wrapper).
 *
 * @param {Object} props - The picker's field props (`slotProps.field` from
 * the wrapper).
 * @param {string} [props.label] - Input label.
 * @param {boolean} [props.error] - Error state.
 * @param {string} [props.helperText] - Helper text.
 * @param {boolean} [props.fullWidth] - Full-width input.
 * @param {string} [props.variant] - MUI TextField variant.
 * @param {string} [props.margin] - MUI TextField margin.
 * @param {boolean} [props.autoFocus] - Autofocus the input on mount.
 * @param {string} [props.name] - Input name.
 * @param {string} [props.id] - Input id.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {boolean} [props.readOnly] - Read-only state (calendar still usable).
 * @param {Object} [props.slotProps] - Picker slot props (user input slot
 * adornments are preserved beside the open button).
 * @param {import('react').Ref} [props.inputRef] - The picker's input ref.
 * @returns {JSX.Element} The Ethiopian date field.
 */
function EthiopianDateField(props) {
  const {
    label,
    error,
    helperText,
    fullWidth,
    variant,
    margin,
    autoFocus,
    name,
    id,
    disabled,
    readOnly,
    slotProps,
    inputRef,
  } = props;
  const pickerContext = usePickerContext();
  const { value, setValue, setOpen, triggerRef, triggerStatus, open } = pickerContext;
  const [draft, setDraft] = useState(null);
  const forkedInputRef = useForkRef(inputRef, triggerRef);

  const display =
    draft ??
    (value
      ? formatEthiopianDate(
          gregorianToEthiopian(value.year(), value.month() + 1, value.date()),
        )
      : "");

  const handleChange = (event) => {
    const text = event.target.value;
    setDraft(text);
    if (text === "") {
      setValue(null, { changeImportance: "set", source: "field" });
      return;
    }
    const ethiopian = parseEthiopianDate(text);
    if (!ethiopian) {
      return;
    }
    const gregorian = ethiopianToGregorian(ethiopian.year, ethiopian.month, ethiopian.day);
    setValue(
      dayjs(new Date(gregorian.year, gregorian.month - 1, gregorian.day)),
      { changeImportance: "set", source: "field" },
    );
  };

  const handleBlur = () => {
    setDraft(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleFieldClick = (event) => {
    if (open || event.target.closest("button")) {
      return;
    }
    setOpen(true);
  };

  const handleOpenPicker = () => {
    setOpen(true);
  };

  const openButton =
    triggerStatus !== "hidden" ? (
      <InputAdornment position="end">
        <IconButton
          aria-label={DATE_PICKER_OPEN_ARIA_LABEL}
          size="small"
          disabled={triggerStatus === "disabled"}
          onClick={handleOpenPicker}
        >
          <CalendarIcon fontSize="small" />
        </IconButton>
      </InputAdornment>
    ) : null;

  const userEndAdornment = slotProps?.input?.endAdornment;
  const endAdornment =
    userEndAdornment || openButton ? (
      <Fragment>
        {userEndAdornment}
        {openButton}
      </Fragment>
    ) : undefined;

  return (
    <MuiTextField
      label={label}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      variant={variant}
      margin={margin}
      autoFocus={autoFocus}
      name={name}
      id={id}
      disabled={disabled}
      readOnly={readOnly}
      value={display}
      onChange={handleChange}
      onBlur={handleBlur}
      onClick={handleFieldClick}
      onKeyDown={handleKeyDown}
      inputRef={forkedInputRef}
      slotProps={{
        ...slotProps,
        input: { ...slotProps?.input, endAdornment },
      }}
    />
  );
}

EthiopianDateField.displayName = "EthiopianDateField";

/**
 * Responsive date picker for Ethiopian dates (1.6): DesktopDatePicker on
 * md+ (popper) and MobileDatePicker below md (dialog), switched explicitly
 * via `theme.breakpoints.up('md')` — never auto (`## MUI Component
 * Standards` §9.4).
 *
 * Value contract (Phase 3 decision — conversion wrapper): `value`/`onChange`
 * operate on a Gregorian `dayjs` anchor; the input always displays its true
 * Ethiopian equivalent as DD-MM-YY (`EthiopianDateField` — the dayjs
 * `format` string is never used for the display, so Ethiopian month 2
 * (Tikimt) days 29–30 and month 13 (Pagume) can never roll over or render
 * as December). The panel stays Gregorian. Typing is interpreted as
 * Ethiopian with a 2- or 4-digit year (e.g. `30-02-18` commits to the
 * Gregorian anchor 2025-11-09). Consumers map the value to the DD-MM-YYYY
 * API strings with `formatEthiopianDateLong` and back with
 * `parseEthiopianDate`. A fully Ethiopian month-name panel is deferred.
 *
 * RHF integration: requires the `Controller` wrapper (DatePicker uses a
 * custom onChange — `## React Hook Form Standards` §3).
 *
 * @param {Object} props - Component props.
 * @param {dayjs.Dayjs | null} props.value - The Gregorian value anchor.
 * @param {(value: dayjs.Dayjs | null) => void} props.onChange - Change handler.
 * @param {string} [props.label] - Input label.
 * @param {boolean} [props.error] - Error state.
 * @param {string} [props.helperText] - Helper text.
 * @param {boolean} [props.fullWidth] - Full-width input (default true).
 * @param {Object} [props.slotProps] - Picker slot props; `slotProps.field`
 * overrides the defaults, `slotProps.input.endAdornment` is rendered beside
 * the calendar open button.
 * @returns {JSX.Element} The MUI date picker.
 */
function MuiDatePicker({
  value,
  onChange,
  label,
  error,
  helperText,
  fullWidth,
  slotProps,
  ...rest
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const commonProps = {
    value,
    onChange,
    slots: { field: EthiopianDateField },
    slotProps: {
      ...slotProps,
      field: { label, error, helperText, fullWidth: fullWidth ?? true, ...slotProps?.field },
    },
    ...rest,
  };

  return isDesktop ? (
    <DesktopDatePicker {...commonProps} />
  ) : (
    <MobileDatePicker {...commonProps} />
  );
}

MuiDatePicker.displayName = "MuiDatePicker";

export default MuiDatePicker;
