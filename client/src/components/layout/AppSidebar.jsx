/**
 * @module components/layout/AppSidebar
 */

import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { alpha, useTheme } from "@mui/material/styles";
import Menu from "@mui/icons-material/Menu";
import Description from "@mui/icons-material/Description";
import Dashboard from "@mui/icons-material/Dashboard";
import Storefront from "@mui/icons-material/Storefront";
import Person from "@mui/icons-material/Person";
import SmartToy from "@mui/icons-material/SmartToy";
import Logout from "@mui/icons-material/Logout";

import {
  API_CONFIG,
  SIDEBAR_WIDTH_FULL,
  SIDEBAR_WIDTH_MINI,
} from "../../utils/constants.js";
import { useLogout } from "../../hooks/useLogout.js";

/** @type {{ path: string, label: string, icon: import('react').ReactElement }[]} Nav items. */
const NAV_ITEMS = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <Dashboard fontSize="small" />,
  },
  {
    path: "/reports",
    label: "Reports",
    icon: <Description fontSize="small" />,
  },
  {
    path: "/branches",
    label: "Branches",
    icon: <Storefront fontSize="small" />,
  },
  { path: "/profile", label: "Profile", icon: <Person fontSize="small" /> },
  {
    path: "/assistant",
    label: "Assistant",
    icon: <SmartToy fontSize="small" />,
  },
];

/**
 * Navigation sidebar for the protected layout (2.3, REQ-097): temporary
 * overlay drawer below `md` (240px), permanent docked drawer at `md+` in
 * full (240px) or mini (64px) mode. Logout dispatches the RTK logout flow
 * and navigates to `/login`.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Temporary-drawer visibility (mobile).
 * @param {() => void} props.onClose - Close handler (mobile).
 * @param {'full' | 'mini'} props.sidebarMode - Permanent-drawer mode (desktop).
 * @param {() => void} props.onToggle - Full/mini toggle handler (desktop).
 * @returns {JSX.Element} The sidebar.
 */
function AppSidebar({ open, onClose, sidebarMode, onToggle }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMini = sidebarMode === "mini";
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = useLogout();

  const isItemSelected = useCallback(
    (path) => {
      if (path === "/dashboard") {
        return location.pathname === path;
      }
      return location.pathname.startsWith(path);
    },
    [location.pathname],
  );

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      onClose();
    },
    [navigate, onClose],
  );

  const handleLogoClick = useCallback(() => {
    navigate("/");
    onClose();
  }, [navigate, onClose]);

  const itemSx = (selected) => ({
    flex: "0 0 auto",
    borderRadius: 1,
    color: "text.secondary",
    borderLeft: `3px solid transparent`,
    my: 0.2,
    "&:hover": { backgroundColor: "action.hover" },
    ...(selected && {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      color: "primary.main",
      fontWeight: 600,
      borderLeft: `3px solid ${theme.palette.primary.main}`,
    }),
  });

  const content = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          minHeight: 64,
          px: isMini ? 1 : 2,
          justifyContent: isMini ? "center" : "flex-start",
        }}
      >
        <IconButton
          aria-label={isDesktop ? "Toggle sidebar" : "Close sidebar"}
          onClick={isDesktop ? onToggle : onClose}
          edge="start"
          size="small"
        >
          <Menu fontSize="small" />
        </IconButton>
        {!isMini ? (
          <Button
            aria-label="App home"
            variant="text"
            color="inherit"
            size="small"
            onClick={handleLogoClick}
            sx={{ textTransform: "none", px: 1, minWidth: 0, flexShrink: 1 }}
          >
            <Description color="primary" fontSize="small" />
            <Typography variant="h6" noWrap sx={{ ml: 1 }}>
              {API_CONFIG.VITE_APP_NAME}
            </Typography>
          </Button>
        ) : null}
      </Box>
      <List component="nav" sx={{ flexGrow: 1, px: 1 }}>
        {NAV_ITEMS.map((item) => {
          const selected = isItemSelected(item.path);
          const listItem = (
            <ListItemButton
              key={item.path}
              selected={selected}
              onClick={() => handleNavigate(item.path)}
              sx={itemSx(selected)}
              aria-label={item.label}
            >
              <ListItemIcon
                sx={{
                  minWidth: isMini ? 16 : 40,
                  color: selected ? "primary.main" : "action.active",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isMini ? <ListItemText primary={item.label} /> : null}
            </ListItemButton>
          );
          return isMini ? (
            <Tooltip key={item.path} title={item.label} placement="right">
              {listItem}
            </Tooltip>
          ) : (
            listItem
          );
        })}
      </List>
      <Divider />
      <List sx={{ p: 1 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            flex: "0 0 auto",
            borderRadius: 1,
            color: "text.secondary",
            "&:hover": {
              backgroundColor: alpha(theme.palette.error.main, 0.08),
              color: "error.main",
            },
          }}
          aria-label="Logout"
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: "action.active",
              justifyContent: "center",
            }}
          >
            <Logout fontSize="small" />
          </ListItemIcon>
          {!isMini ? <ListItemText primary="Logout" /> : null}
        </ListItemButton>
      </List>
    </Box>
  );

  const paperSx = (width) => ({
    width,
    boxSizing: "border-box",
    borderRight: 1,
    borderColor: "divider",
  });

  if (isDesktop) {
    const width = isMini ? SIDEBAR_WIDTH_MINI : SIDEBAR_WIDTH_FULL;
    return (
      <Drawer
        variant="permanent"
        sx={{ width, flexShrink: 0, "& .MuiDrawer-paper": paperSx(width) }}
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      disableEnforceFocus={true}
      disableRestoreFocus={true}
      sx={{ "& .MuiDrawer-paper": paperSx(SIDEBAR_WIDTH_FULL) }}
    >
      {content}
    </Drawer>
  );
}

AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
