/**
 * @module components/register/RegisterForm
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
import { API_CONFIG, PASSWORD_MIN_LENGTH } from '../../utils/constants.js';
import { useRegisterMutation } from '../../redux/features/authSlice.js';

/**
 * Sign-up form (3.3): email + password + confirm password via RHF
 * (`mode: 'onBlur'`, confirm matches password), Google OAuth button
 * (stubbed until credentials are configured), 409 → `setError` on email,
 * 422 → per-field `setError`, 429 → toast, success → toast + navigate to
 * `/dashboard`.
 *
 * @returns {JSX.Element} The sign-up form.
 */
function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [googleLoading, setGoogleLoading] = useState(false);

  const googleOAuthUrl = new URL('/oauth/google', API_CONFIG.VITE_API_BASE_URL).href;

  const handleGoogleClick = useCallback(() => {
    setGoogleLoading(true);
    window.location.assign(googleOAuthUrl);
  }, [googleOAuthUrl]);

  const handleSubmitRegister = handleSubmit(async (values) => {
    try {
      await registerUser({ email: values.email, password: values.password }).unwrap();
      reset();
      toast.success('Account created successfully');
      navigate(location.state?.from?.pathname || '/dashboard');
    } catch (error) {
      if (error.status === 409) {
        setError('email', { message: 'Email already in use' });
      } else if (error.status === 422) {
        const fieldErrors = error.data?.data?.errors || [];
        fieldErrors.forEach((fieldError) => {
          setError(fieldError.field, { message: fieldError.message });
        });
      } else if (error.status === 429) {
        toast.error(error.data?.message || 'Too many requests');
      } else {
        toast.error(error.data?.message || 'Something went wrong');
      }
    }
  });

  return (
    <Box component="form" onSubmit={handleSubmitRegister} noValidate>
      <Box sx={{ textAlign: "center" }}>
        <Description fontSize="large" color="primary" sx={{ mb: 1 }} />
        <Typography variant="h5" fontWeight={600}>
          Sign Up
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create your account to get started
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
        Sign up with Google
      </MuiButton>
      <Divider sx={{ my: 2.5 }} textAlign="center">
        or
      </Divider>
      <MuiTextField
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        })}
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
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: `At least ${PASSWORD_MIN_LENGTH} characters`,
            },
          })}
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
      <Box sx={{ mt: 2 }}>
        <MuiTextField
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value, values) =>
              value === values.password || "Passwords must match",
          })}
          label="Confirm Password"
          type="password"
          fullWidth
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
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
        Sign Up
      </MuiButton>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2, textAlign: "center" }}
      >
        Already have an account?
        <MuiButton
          type="button"
          variant="text"
          onClick={() => navigate("/login")}
          sx={{ ml: 1 }}
        >
          Sign In
        </MuiButton>
      </Typography>
    </Box>
  );
}

RegisterForm.displayName = 'RegisterForm';

export default RegisterForm;
