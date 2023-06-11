import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Resize } from "@cloudinary/url-gen/actions/resize";
import { Box, Button, Menu, MenuItem, useScrollTrigger } from "@mui/material";
import { block } from "million/react";

import cld from "@/api/cloudinary";
import { cn } from "@/utils";

const LIGHT_LOGO = cld.image("logo/logo-white").resize(Resize.scale()).toURL();

const SCROLL_THRESHOLD = 30;

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About/CV" },
];

const PORTFOLIO_LINKS = [
  { path: "/dev", label: "Software" },
  { path: "/photography", label: "Photography" },
  { path: "/svip", label: "Coursework" },
];

const Navbar = block(() => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement>(null!);
  const isPastScrollThreshold = useScrollTrigger({
    disableHysteresis: true,
    threshold: SCROLL_THRESHOLD,
    target: window ? window : undefined,
  });
  const isHomepage = location.pathname === "/";

  return (
    <>
      <header
        className={cn("z-10 w-full", {
          fixed: isHomepage,
        })}
        ref={headerRef}
      >
        <nav
          className={cn(
            "mb-10 bg-gradient-to-r from-indigo-950 to-purple-900 px-12",
            "transition-all duration-300 ease-in-out",
            {
              "m-8 rounded-[50px] py-2": !isPastScrollThreshold && isHomepage,
            },
          )}
        >
          <div className="flex">
            <div className="flex flex-auto items-center">
              <Link to="/">
                <img
                  src={LIGHT_LOGO}
                  alt="logo"
                  className={cn(
                    "h-[50px] opacity-0 transition-all duration-300 ease-in-out",
                    {
                      "opacity-1 my-2 h-[70px]": isHomepage
                        ? isPastScrollThreshold
                        : true,
                    },
                  )}
                />
              </Link>
            </div>
            <div className="flex flex-auto items-center justify-end">
              {NAV_LINKS.map(nav => (
                <Link to={nav.path} key={nav.path}>
                  <Button
                    disableRipple
                    variant="text"
                    className="section-header text-white"
                    size="large"
                  >
                    {nav.label}
                  </Button>
                </Link>
              ))}
              <Button
                disableRipple
                variant="text"
                className="section-header text-white"
                onClick={e => setAnchorEl(e.currentTarget)}
                size="large"
              >
                Portfolio
              </Button>
            </div>
          </div>
        </nav>
      </header>

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
        PaperProps={{
          className: "rounded-2xl bg-purple-900",
        }}
      >
        {PORTFOLIO_LINKS.map(link => (
          <Box
            key={link.path}
            component={Link}
            to={link.path}
            className="section-header text-white"
          >
            <MenuItem
              onClick={() => setAnchorEl(null)}
              disableRipple
              className="flex place-content-end text-white"
            >
              {link.label}
            </MenuItem>
          </Box>
        ))}
      </Menu>
    </>
  );
});

export default Navbar;
