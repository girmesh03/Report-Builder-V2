/**
 * @module pages/Landing
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Description from '@mui/icons-material/Description';

import MuiButton from '../components/reusable/MuiButton.jsx';

/**
 * Landing page hero (index route, PublicLayout; spec §12.6 §6): centered
 * wrapper `max-width: 1200px` with the app logo, the "Build Better Reports"
 * headline (h4 on xs, h3 on md+), the subheadline, and two CTAs — "Get
 * Started" (contained → `/register`) and "Sign In" (outlined → `/login`).
 * Static page: no data fetching, no Redux; all text ellipsizes on overflow;
 * no horizontal scroll.
 *
 * @returns {JSX.Element} The landing page.
 */
function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const handleSignIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', textAlign: 'center', px: 2, py: { xs: 6, md: 12 } }}>
      <Description fontSize="large" color="primary" sx={{ mb: 2 }} />
      <Typography sx={{ typography: { xs: 'h4', md: 'h3' } }} noWrap>
        Build Better Reports
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }} noWrap>
        Record, transcribe, and generate professional reports with AI
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <MuiButton variant="contained" onClick={handleGetStarted}>
          Get Started
        </MuiButton>
        <MuiButton variant="outlined" onClick={handleSignIn}>
          Sign In
        </MuiButton>
      </Box>
    </Box>
  );
}

Landing.displayName = 'Landing';

export default Landing;
