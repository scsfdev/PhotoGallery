import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Link,
  Box,
  Container,
  MenuItem,
  LinearProgress,
} from "@mui/material";

import { Camera } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import MenuItemLink from "./MenuItemLink";
import { useStore } from "@hooks/useStore";
import { Observer } from "mobx-react-lite";

export default function NavBar() {
  const isLoggedIn = false; // To be replaced with auth context later.
  const { uiStore } = useStore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(90deg, #222044ff,  #673efaff, #1303f5ff)",
          position: "relative",
        }}
      >
        <Container maxWidth={false}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo / Home link */}
            <Box>
              <MenuItem
                sx={{ display: "flex", gap: 1 }}
                component={NavLink}
                to="/"
              >
                <Camera fontSize="large" />
                <Typography variant="h6" component="div">
                  My Photo Gallery
                </Typography>
              </MenuItem>
            </Box>

            {/* Navigation links */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <MenuItemLink to="/categories">Category</MenuItemLink>

              <MenuItemLink to="/about">About</MenuItemLink>

              <MenuItemLink to="/contact">Contact</MenuItemLink>
            </Box>

            {/* Right-side buttons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                variant="contained"
                color="warning"
                component={NavLink}
                to="/login"
              >
                Login
              </Button>
              {isLoggedIn && (
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  component={NavLink}
                  to="/admin/dashboard"
                >
                  Admin
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>

        <Observer>
          {() =>
            uiStore.isLoading ? (
              <LinearProgress
                color="secondary"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                }}
              />
            ) : null
          }
        </Observer>
      </AppBar>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage:
          "linear-gradient(90deg, #222044ff, #673efaff, #1303f5ff)",
      }}
    >
      <Toolbar
        variant="dense" // makes Toolbar 48px
        sx={{
          justifyContent: "space-between",
          minHeight: 48, // ensure small height
          paddingY: 0,
        }}
      >
        {/* Left side: icon + title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Camera sx={{ fontSize: 24 }} />
          <Typography variant="h6" noWrap>
            My Photo Gallery
          </Typography>
        </Box>

        {/* Right side: links + buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link
            href="/photos"
            underline="none"
            sx={{ fontSize: "0.9rem", color: "inherit" }}
          >
            Photos
          </Link>
          <Link
            href="/categories"
            underline="none"
            sx={{ fontSize: "0.9rem", color: "inherit" }}
          >
            Categories
          </Link>

          <Button size="small" variant="contained" color="warning">
            Login
          </Button>

          {isLoggedIn && (
            <Button size="small" color="inherit" href="/admin/dashboard">
              Admin
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
