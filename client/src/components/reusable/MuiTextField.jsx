/**
 * @module components/reusable/MuiTextField
 */

import { forwardRef, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

/**
 * Single reusable text input wrapping MUI TextField (1.4): `size="small"`,
 * `forwardRef` for RHF `register`, and an internal password eye toggle with
 * no layout shift. The caller's `slotProps.input.endAdornment` is merged
 * after the eye icon.
 *
 * @param {Object} props - TextField props; `type` defaults to `"text"`.
 * @param {import('react').Ref} ref - Forwarded ref for RHF `register`.
 * @returns {JSX.Element} The MUI text field.
 */
const MuiTextField = forwardRef(function MuiTextField(props, ref) {
  const { type = 'text', slotProps, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const togglePassword = useCallback(() => {
    setShowPassword((previous) => !previous);
  }, []);

  return (
    <TextField
      {...rest}
      ref={ref}
      type={isPassword && showPassword ? 'text' : type}
      size="small"
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onMouseDown={(event) => event.preventDefault()}
                onClick={togglePassword}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
              {slotProps?.input?.endAdornment}
            </InputAdornment>
          ) : (
            slotProps?.input?.endAdornment
          ),
        },
      }}
    />
  );
});

MuiTextField.displayName = 'MuiTextField';

export default MuiTextField;
