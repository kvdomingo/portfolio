import { Component } from "react";
import {
  MDBNavbar as Navbar,
  MDBNavbarBrand as NavbarBrand,
  MDBNavbarNav as NavbarNav,
  MDBNavLink as NavLink,
  MDBNavItem as NavItem,
  MDBNavbarToggler as NavbarToggler,
  MDBCollapse as Collapse,
  MDBDropdown as Dropdown,
  MDBDropdownToggle as DropdownToggle,
  MDBDropdownMenu as DropdownMenu,
  MDBDropdownItem as DropdownItem,
} from "mdbreact";
import { Image } from "cloudinary-react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import GAUtil from "../utils/GAUtil";

const bigLogoHeight = "70px",
  smallLogoHeight = "50px",
  dropdownItems = [
    { name: "Photography", path: "/photography" },
    { name: "Coursework", path: "/svip" },
    { name: "Web Development", path: "/dev" },
  ],
  navbarItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "CV", path: "/cv" },
  ];

class NavBar extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  state = {
    background: "rgba(0, 0, 0, 0.0)",
    dropdownOpen: false,
    fixed: "fixed-top navbar-dark",
    isOpen: false,
    navBrand: "logo/logo-white",
    navBrandHeight: bigLogoHeight,
    navBrandOpacity: 1,
    padY: "py-3",
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleNavScroll);
    this.updateNavStyles();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleNavScroll);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let prevLocation = prevProps.location;
    let { location } = this.props;
    if (prevLocation.pathname !== location.pathname) {
      window.scrollTo(0, 0);
      this.setState({ isOpen: false });
      this.updateNavStyles();
    }
  }

  updateNavStyles = () => {
    if (this.props.location.pathname === "/") {
      this.setState({
        background: "rgba(0, 0, 0, 0.0)",
        fixed: "fixed-top navbar-dark",
        navBrand: "logo/logo-white",
        navBrandOpacity: 0,
      });
    } else {
      this.setState({
        background: "rgba(255, 255, 255, 0.90)",
        fixed: "navbar-light",
        navBrand: "logo/logo-black",
        navBrandOpacity: 1,
      });
    }
  };

  handleNavScroll = () => {
    if (window.scrollY < 30) {
      if (this.props.location.pathname === "/") {
        this.setState({
          background: "rgba(0, 0, 0, 0.0)",
          navBrandOpacity: 0,
        });
      } else {
        this.setState({
          navBrandOpacity: 1,
        });
      }
      this.setState({
        navBrandHeight: bigLogoHeight,
        padY: "py-3",
      });
    } else {
      if (this.props.location.pathname === "/") {
        this.setState({
          background: "rgba(0, 0, 0, 0.90)",
          navBrandOpacity: 1,
        });
      }
      this.setState({
        navBrandHeight: smallLogoHeight,
        padY: "py-1",
      });
    }
  };

  toggleCollapse = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  openDropdown = () => {
    this.setState({
      dropdownOpen: true,
    });
  };

  closeDropdown = () => {
    this.setState({
      dropdownOpen: false,
    });
  };

  render() {
    const { fixed, padY, navBrand, navBrandHeight, navBrandOpacity, dropdownOpen, background, isOpen } = this.state;
    const { toggleCollapse, openDropdown, closeDropdown } = this;
    return (
      <Navbar
        expand="lg"
        className={`navbar-slick px-5 ${fixed} ${padY}`}
        style={{
          background: background,
          boxShadow: "none",
        }}
      >
        <GAUtil />
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
        <NavbarToggler onClick={toggleCollapse} />
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
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
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
}

export default withRouter(NavBar);
