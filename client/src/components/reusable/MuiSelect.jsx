/**
 * @module components/reusable/MuiSelect
 */

import { forwardRef } from 'react';
import Select from '@mui/material/Select';

/**
 * Reusable select input wrapping MUI Select (1.5); `forwardRef` for RHF
 * `register` compatibility. Defaults `size="small"` and caps the dropdown
 * height at 300px (`## MUI Component Standards` §9.3).
 *
 * @param {Object} props - All standard MUI Select props pass through.
 * @returns {JSX.Element} The MUI select.
 */
const MuiSelect = forwardRef(function MuiSelect(props) {
  return (
    <Select
      {...props}
      size={props.size ?? 'small'}
      MenuProps={{
        slotProps: { paper: { sx: { maxHeight: 300 } } },
        ...props.MenuProps,
      }}
    />
  );
});

MuiSelect.displayName = 'MuiSelect';

export default MuiSelect;
