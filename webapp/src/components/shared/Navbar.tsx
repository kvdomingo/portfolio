import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { AppBar, AppBarProps, Box, Button, Grid, Menu, MenuItem, Toolbar, useScrollTrigger } from "@mui/material";
import cld from "../../api/cloudinary";

const DARK_LOGO = cld.image("logo/logo-black").resize(Resize.scale()).toURL();

const LIGHT_LOGO = cld.image("logo/logo-white").resize(Resize.scale()).toURL();

const BIG_LOGO_HEIGHT = 70;

const SMALL_LOGO_HEIGHT = 50;

const SCROLL_THRESHOLD = 30;

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About/CV" },
];

const portfolioLinks = [
  { path: "/dev", label: "Software" },
  { path: "/photography", label: "Photography" },
  { path: "/svip", label: "Coursework" },
];

function Navbar() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [navStyles, setNavStyles] = useState({
    background: "rgba(0, 0, 0, 0.0)",
    height: BIG_LOGO_HEIGHT,
  });
  const [navPosition, setNavPosition] = useState<AppBarProps["position"]>("fixed");
  const [logo, setLogo] = useState(LIGHT_LOGO);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [logoHeight, setLogoHeight] = useState(BIG_LOGO_HEIGHT);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: SCROLL_THRESHOLD,
    target: window ? window : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    function updateNavStyles() {
      if (location.pathname === "/") {
        setNavStyles(style => ({
          ...style,
          background: "rgba(0, 0, 0, 0.0)",
        }));
        setNavPosition("fixed");
        setLogo(LIGHT_LOGO);
        setLogoOpacity(0);
      } else {
        setNavStyles(style => ({
          ...style,
          background: "rgba(255, 255, 255, 0.9)",
        }));
        setNavPosition("relative");
        setLogo(DARK_LOGO);
        setLogoOpacity(1);
      }
    }

    updateNavStyles();
  }, [location.pathname]);

  useEffect(() => {
    function handleScroll() {
      const style = { ...navStyles };
      if (window.scrollY < SCROLL_THRESHOLD) {
        if (location.pathname === "/") {
          Object.assign(style, { background: "rgba(0, 0, 0, 0.0)" });
          setLogoOpacity(0);
        } else {
          Object.assign(style, { background: "rgba(255, 255, 255, 0.0)" });
          setLogoOpacity(1);
        }
        setLogoHeight(BIG_LOGO_HEIGHT);
      } else {
        if (location.pathname === "/") {
          Object.assign(style, { background: "rgba(0, 0, 0, 0.9)" });
          setLogoOpacity(1);
        } else {
          Object.assign(style, { background: "rgba(255, 255, 255, 0.9)" });
        }
        setLogoHeight(SMALL_LOGO_HEIGHT);
      }
      setNavStyles(style);
    }

    handleScroll();
  }, [trigger, location.pathname]);

  return (
    <>
      <AppBar
        position={navPosition}
        sx={{
          ...navStyles,
          boxShadow: "none",
          height: `calc(${logoHeight}px + 1em)`,
          transition: "height 100ms ease-in-out",
        }}
      >
        <Toolbar sx={{ height: "100%" }}>
          <Grid container>
            <Grid item xs container alignItems="center">
              <Link to="/">
                <Box
                  component="img"
                  src={logo}
                  height={logoHeight}
                  sx={{ opacity: logoOpacity, transition: "all 100ms ease-in-out" }}
                />
              </Link>
            </Grid>
            <Grid item xs container alignItems="center" justifyContent="flex-end">
              {navLinks.map(nav => (
                <Link to={nav.path} key={nav.path}>
                  <Button
                    variant="text"
                    sx={{ color: location.pathname === "/" ? "white" : "text.primary" }}
                    className="section-header"
                    size="large"
                  >
                    {nav.label}
                  </Button>
                </Link>
              ))}
              <Button
                variant="text"
                sx={{ color: location.pathname === "/" ? "white" : "text.primary" }}
                className="section-header"
                onClick={e => setAnchorEl(e.currentTarget)}
                size="large"
              >
                Portfolio
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        elevation={6}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {portfolioLinks.map(port => (
          <Box
            key={port.path}
            component={Link}
            to={port.path}
            sx={{ color: "text.primary", textDecoration: "none" }}
            className="section-header"
          >
            <MenuItem onClick={() => setAnchorEl(null)} disableRipple sx={{ display: "flex", justifyContent: "right" }}>
              {port.label}
            </MenuItem>
          </Box>
        ))}
      </Menu>
    </>
  );
}

export default Navbar;
