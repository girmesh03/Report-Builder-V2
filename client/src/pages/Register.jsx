/**
 * @module pages/Register
 */

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import RegisterForm from '../components/register/RegisterForm.jsx';

/**
 * Register page (PublicLayout): centered card containing the sign-up form.
 *
 * @returns {JSX.Element} The register page.
 */
function Register() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 420,
          width: "100%",
          p: 4,
          borderRadius: 2,
          backgroundImage: "none",
        }}
      >
        <RegisterForm />
      </Paper>
    </Box>
  );
}

Register.displayName = 'Register';

export default Register;
