/**
 * @module pages/Login
 */

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import LoginForm from '../components/login/LoginForm.jsx';

/**
 * Login page (PublicLayout): centered card containing the sign-in form.
 *
 * @returns {JSX.Element} The login page.
 */
function Login() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%', p: 2 }}>
      <Paper elevation={3} sx={{ maxWidth: 420, width: '100%', p: 4, borderRadius: 2, backgroundImage:'none' }}>
        <LoginForm />
      </Paper>
    </Box>
  );
}

Login.displayName = 'Login';

export default Login;
