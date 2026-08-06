/**
 * @module components/layout/AppShell
 */

import { useCallback, useState } from "react";
import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import AppSidebar from "./AppSidebar.jsx";
import MuiAppbar from "../reusable/MuiAppbar.jsx";

/**
 * Protected layout wrapper for all authenticated pages (2.2, REQ-096):
 * AppSidebar and a content column (protected MuiAppbar 64px → `<Outlet />`)
 * as siblings; the app bar sits inside the content area, not across the
 * sidebar. Outer container is `height: 100vh; overflow: hidden`.
 *
 * @returns {JSX.Element} The app shell.
 */
function AppShell() {
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarMode, setSidebarMode] = useState("full");

  const handleSidebarClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const handleSidebarToggle = useCallback(() => {
    setSidebarMode((previous) => (previous === "full" ? "mini" : "full"));
  }, []);

  return (
    <Box sx={{ height: "100vh", overflow: "hidden", display: "flex" }}>
      <AppSidebar
        open={drawerOpen}
        onClose={handleSidebarClose}
        sidebarMode={sidebarMode}
        onToggle={handleSidebarToggle}
      />
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <MuiAppbar variant="protected" position="static" />
          {isMobile ? (
            <IconButton
              aria-label="Open sidebar"
              onClick={() => setDrawerOpen(true)}
              sx={{
                position: "absolute",
                left: 8,
                top: 14,
                color: "text.secondary",
              }}
            >
              <Menu fontSize="small" />
            </IconButton>
          ) : null}
        </Box>
        <Box component="main" sx={{ flexGrow: 1, overflowY: "auto", p: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

AppShell.displayName = "AppShell";

export default AppShell;
