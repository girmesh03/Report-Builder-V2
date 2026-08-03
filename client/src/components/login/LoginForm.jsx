/**
 * @module components/login/LoginForm
 */

import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Email from '@mui/icons-material/Email';
import Lock from '@mui/icons-material/Lock';
import Description from '@mui/icons-material/Description';

import MuiButton from '../reusable/MuiButton.jsx';
import MuiTextField from '../reusable/MuiTextField.jsx';
import GoogleIcon from '../reusable/GoogleIcon.jsx';
import { API_CONFIG } from '../../utils/constants.js';
import { useLoginMutation } from '../../redux/features/authSlice.js';

/**
 * Sign-in form (3.2): email + password via RHF (`mode: 'onBlur'`), Google
 * OAuth button (stubbed until credentials are configured), 422 → per-field
 * `setError`, 401/429 → toast, success → navigate to `state.from` or
 * `/dashboard`.
 *
 * @returns {JSX.Element} The sign-in form.
 */
function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [googleLoading, setGoogleLoading] = useState(false);

  const googleOAuthUrl = new URL('/oauth/google', API_CONFIG.VITE_API_BASE_URL).href;

  const handleGoogleClick = useCallback(() => {
    setGoogleLoading(true);
    window.location.assign(googleOAuthUrl);
  }, [googleOAuthUrl]);

  const handleSubmitLogin = handleSubmit(async (values) => {
    try {
      await login(values).unwrap();
      reset();
      navigate(location.state?.from?.pathname || '/dashboard');
    } catch (error) {
      if (error.status === 422) {
        const fieldErrors = error.data?.data?.errors || [];
        fieldErrors.forEach((fieldError) => {
          setError(fieldError.field, { message: fieldError.message });
        });
      } else if (error.status === 401) {
        toast.error('Invalid email or password');
      } else {
        toast.error(error.data?.message || 'Something went wrong');
      }
    }
  });

  return (
    <Box component="form" onSubmit={handleSubmitLogin} noValidate>
      <Box sx={{ textAlign: "center" }}>
        <Description fontSize="large" color="primary" sx={{ mb: 1 }} />
        <Typography variant="h5" fontWeight={600}>
          Sign In
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Welcome back! Sign in to continue
        </Typography>
      </Box>
      <MuiButton
        type="button"
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        loading={googleLoading}
        onClick={handleGoogleClick}
      >
        Sign in with Google
      </MuiButton>
      <Divider sx={{ my: 2.5 }} textAlign="center">
        or
      </Divider>
      <MuiTextField
        {...register("email", { required: "Email is required" })}
        label="Email"
        type="email"
        fullWidth
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Email fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
      <Box sx={{ mt: 2 }}>
        <MuiTextField
          {...register("password", { required: "Password is required" })}
          label="Password"
          type="password"
          fullWidth
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <MuiButton
        type="submit"
        variant="contained"
        fullWidth
        loading={isSubmitting}
        sx={{ mt: 2, flexShrink: 0 }}
      >
        Sign In
      </MuiButton>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2, textAlign: "center" }}
      >
        Don&apos;t have an account?
        <MuiButton
          type="button"
          variant="text"
          onClick={() => navigate("/register")}
          sx={{ ml: 1 }}
        >
          Sign Up
        </MuiButton>
      </Typography>
    </Box>
  );
}

LoginForm.displayName = 'LoginForm';

export default LoginForm;
