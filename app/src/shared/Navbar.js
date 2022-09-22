import { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import {
  MDBCollapse as Collapse,
  MDBDropdown as Dropdown,
  MDBDropdownItem as DropdownItem,
  MDBDropdownMenu as DropdownMenu,
  MDBDropdownToggle as DropdownToggle,
  MDBNavItem as NavItem,
  MDBNavLink as NavLink,
  MDBNavbar as Navbar,
  MDBNavbarBrand as NavbarBrand,
  MDBNavbarNav as NavbarNav,
  MDBNavbarToggler as NavbarToggler,
} from "mdbreact";
import { Link, useLocation } from "react-router-dom";
import useGA from "../hooks/useGA";

const bigLogoHeight = "70px";

const smallLogoHeight = "50px";

const dropdownItems = [
  { name: "Photography", path: "/photography" },
  { name: "Coursework", path: "/svip" },
  { name: "Web Development", path: "/dev" },
];

const navbarItems = [
  { name: "Home", path: "/" },
  { name: "About/CV", path: "/about" },
];

function NavBar() {
  useGA();
  const location = useLocation();
  const [background, setBackground] = useState("rgba(0, 0, 0, 0.0)");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fixed, setFixed] = useState("fixed-top navbar-dark");
  const [isOpen, setIsOpen] = useState(false);
  const [navBrand, setNavBrand] = useState("logo/logo-white");
  const [navBrandHeight, setNavBrandHeight] = useState(bigLogoHeight);
  const [navBrandOpacity, setNavBrandOpacity] = useState(1);
  const [padY, setPadY] = useState("py-3");

  useEffect(() => {
    window.addEventListener("scroll", handleNavScroll);
    updateNavStyles();
    return () => window.removeEventListener("scroll", handleNavScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
    updateNavStyles();
  }, [location.pathname]);

  function updateNavStyles() {
    if (location.pathname === "/") {
      setBackground("rgba(0, 0, 0, 0.0)");
      setFixed("fixed-top navbar-dark");
      setNavBrand("logo/logo-white");
      setNavBrandOpacity(0);
    } else {
      setBackground("rgba(255, 255, 255, 0.90)");
      setFixed("navbar-light");
      setNavBrand("logo/logo-black");
      setNavBrandOpacity(1);
    }
  }

  function handleNavScroll() {
    if (window.scrollY < 30) {
      if (location.pathname === "/") {
        setBackground("rgba(0, 0, 0, 0.0)");
        setNavBrandOpacity(0);
      } else {
        setNavBrandOpacity(1);
      }
      setNavBrandHeight(bigLogoHeight);
      setPadY("py-3");
    } else {
      if (location.pathname === "/") {
        setBackground("rgba(0, 0, 0, 0.90)");
        setNavBrandOpacity(1);
      }
      setNavBrandHeight(smallLogoHeight);
      setPadY("py-1");
    }
  }

  return (
    <Navbar
      expand="lg"
      className={`navbar-slick px-5 ${fixed} ${padY}`}
      style={{
        background: background,
        boxShadow: "none",
      }}
    >
      <NavbarBrand>
        <Link to="/">
          <Image
            publicId={navBrand}
            cloudName="kdphotography-assets"
            secure={true}
            alt="Kenneth V. Domingo logo"
            height={navBrandHeight}
            className={`navbar-slick-brand`}
            style={{ opacity: navBrandOpacity }}
          />
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={() => setIsOpen(open => !open)} />
      <Collapse id="navbar" isOpen={isOpen} navbar>
        <NavbarNav right>
          {navbarItems.map(({ name, path }, i) => (
            <NavItem key={i}>
              <NavLink to={path} className="navbar-slick-items">
                {name}
              </NavLink>
            </NavItem>
          ))}
          <NavItem>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={() => {}}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <DropdownToggle nav>
                <span className="mr-2 navbar-slick-items">Portfolio</span>
              </DropdownToggle>
              <DropdownMenu right basic>
                {dropdownItems.map(({ name, path }, i) => (
                  <DropdownItem key={i} className="navbar-slick-items text-right">
                    <Link to={path}>{name}</Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </NavbarNav>
      </Collapse>
    </Navbar>
  );
}

export default NavBar;
