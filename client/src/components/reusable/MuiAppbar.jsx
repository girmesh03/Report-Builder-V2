/**
 * @module components/reusable/MuiAppbar
 */

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useColorScheme } from '@mui/material/styles';
import Description from '@mui/icons-material/Description';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import Search from '@mui/icons-material/Search';

import MuiButton from './MuiButton.jsx';
import GlobalSearchDialog from './GlobalSearchDialog.jsx';
import { API_CONFIG } from '../../utils/constants.js';
import { useLogout } from '../../hooks/useLogout.js';

/**
 * Dark/light color-scheme toggle shared by both app bar variants.
 *
 * @returns {JSX.Element} The theme toggle button.
 */
function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  const isDark = mode === 'dark';
  const handleToggle = useCallback(() => {
    setMode(isDark ? 'light' : 'dark');
  }, [isDark, setMode]);

  return (
    <IconButton aria-label="Toggle color scheme" onClick={handleToggle} color="inherit">
      {isDark ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
    </IconButton>
  );
}

ThemeToggle.displayName = 'ThemeToggle';

/**
 * Single reusable app bar (1.1) configurable for PublicLayout
 * (`variant="public"`, fixed, full width) and AppShell
 * (`variant="protected"`, static, 64px, inside the content area). Public
 * logo navigates to `/dashboard` when authenticated, `/` otherwise; the
 * protected bar shows no logo (per user decision) and renders the right
 * section conditionally on the Redux auth state.
 *
 * @param {Object} props - Component props.
 * @param {'public' | 'protected'} [props.variant] - Layout variant.
 * @param {'fixed' | 'static' | 'relative' | 'absolute' | 'sticky'} [props.position] - MUI AppBar position.
 * @param {number} [props.elevation] - MUI AppBar elevation.
 * @param {string} [props.color] - MUI AppBar color.
 * @param {object} [props.sx] - Additional sx overrides.
 * @returns {JSX.Element} The app bar.
 */
function MuiAppbar({ variant = 'public', position = 'fixed', elevation = 1, color = 'inherit', sx, ...rest }) {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isProtected = variant === 'protected';

  const handleLogoClick = useCallback(() => {
    navigate(isAuthenticated ? '/dashboard' : '/');
  }, [isAuthenticated, navigate]);

  const handleAvatarClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleProfile = useCallback(() => {
    setAnchorEl(null);
    navigate('/profile');
  }, [navigate]);

  const handleLogoutClick = useCallback(() => {
    setAnchorEl(null);
    handleLogout();
  }, [handleLogout]);

  const avatarSize = isDesktop ? 36 : 32;

  return (
    <AppBar
      position={position}
      elevation={elevation}
      color={color}
      sx={{ width: "100%", ...sx }}
      {...rest}
    >
      <Toolbar sx={{ minHeight: isProtected ? 64 : undefined }}>
        {!isProtected ? (
          <Button
            aria-label="App home"
            variant="text"
            color="inherit"
            size="small"
            onClick={handleLogoClick}
            sx={{ textTransform: "none", px: 1, flexShrink: 0 }}
          >
            <Description fontSize="small" />
            <Typography
              variant="h6"
              component="span"
              noWrap
              sx={{ ml: 1, display: { xs: "none", sm: "block" } }}
            >
              {API_CONFIG.VITE_APP_NAME}
            </Typography>
          </Button>
        ) : null}
        <Box sx={{ flexGrow: 1 }} />
        {isProtected ? (
          <>
            <Tooltip title="Search">
              <IconButton
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                color="inherit"
              >
                <Search fontSize="small" />
              </IconButton>
            </Tooltip>
            <ThemeToggle />
            <IconButton
              aria-label="Account"
              onClick={handleAvatarClick}
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Avatar
                alt={user?.fullName || "User"}
                src={user?.avatar || undefined}
                sx={{ width: avatarSize, height: avatarSize }}
              >
                {user?.fullName?.[0] ?? "U"}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfile}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Person fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
            <GlobalSearchDialog
              open={searchOpen}
              onClose={() => setSearchOpen(false)}
            />
          </>
        ) : isAuthenticated ? (
          <>
            <ThemeToggle />
            <Tooltip title="Logout">
              <IconButton
                aria-label="Logout"
                onClick={handleLogout}
                color="inherit"
              >
                <Logout fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <ThemeToggle />
            <MuiButton
              variant="outlined"
              size="small"
              onClick={() => navigate("/login")}
              sx={{ ml: 1 }}
            >
              Login
            </MuiButton>
            <MuiButton
              variant="contained"
              size="small"
              onClick={() => navigate("/register")}
              sx={{ ml: 1 }}
            >
              Sign Up
            </MuiButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

MuiAppbar.displayName = 'MuiAppbar';

export default MuiAppbar;
