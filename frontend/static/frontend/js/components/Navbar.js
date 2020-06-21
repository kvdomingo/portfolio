import React from 'react';
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
} from 'mdbreact';
import { Image } from 'cloudinary-react';
import { Link, withRouter } from 'react-router-dom';


class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navPadY: 'py-3',
            navFixed: 'fixed-top navbar-dark',
            navBrand: 'logo/logo-white',
            navBrandHeight: '30px',
            navIsOpen: false,
            navDropdownOpen: false,
            navBackground: 'rgba(0, 0, 0, 0.0)',
        };
        this.styles = {
            navDropdown: {
                backgroundColor: 'rgba(255, 255, 255, 0.90)',
            },
        };

        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleNavScroll = this.handleNavScroll.bind(this);
        this.changePageNavStyle = this.changePageNavStyle.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleNavScroll);
        this.changePageNavStyle(window.location.pathname);
        this.props.history.listen(() => this.changePageNavStyle(window.location.pathname))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleNavScroll);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
            this.setState({ navIsOpen: false });
        }
    }

    changePageNavStyle(pathName) {
        if (pathName === '/') {
            this.setState({
                navFixed: 'fixed-top navbar-dark',
                navBrand: 'logo/logo-white',
                navBackground: 'rgba(0, 0, 0, 0.0)',
            });
        } else {
            this.setState({
                navFixed: 'navbar-light',
                navBrand: 'logo/logo-black',
                navBackground: 'rgba(255, 255, 255, 0.90)',
            });
        }
    }

    handleNavScroll() {
        if (window.scrollY < 30) {
            if (window.location.pathname === '/') {
                this.setState({ navBackground: 'rgba(0, 0, 0, 0.0)' });
            }
            this.setState({
                navBrandHeight: '30px',
                navPadY: 'py-3'
            });
        } else {
            if (window.location.pathname === '/') {
                this.setState({ navBackground: 'rgba(0, 0, 0, 0.90)' });
            }
            this.setState({
                navBrandHeight: '20px',
                navPadY: 'py-1'
            });
        }
    }

    toggleCollapse() {
        this.setState((prevState) => (
            { navIsOpen: !prevState.navIsOpen }
        ));
    }

    toggleDropdown() {
        this.setState((prevState) => (
            { navDropdownOpen: !prevState.navDropdownOpen }
        ));
    }

    render() {
        return (
            <Navbar
                expand='lg'
                className={`${this.state.navFixed} navbar-slick px-5 ${this.state.navPadY}`}
                style={{
                    background: this.state.navBackground,
                    boxShadow: 'none',
                }}
                >
                <NavbarBrand>
                    <Link to='/'>
                        <Image
                            publicId={this.state.navBrand}
                            cloudName='kdphotography-assets'
                            secure={true}
                            className='navbar-slick-brand'
                            alt='Kenneth V. Domingo logo'
                            height={this.state.navBrandHeight}
                            />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleCollapse} />
                <Collapse
                    id='navbar'
                    isOpen={this.state.navIsOpen}
                    navbar
                    >
                    <NavbarNav right>
                        <NavItem>
                            <NavLink to='/'>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/cv'>CV</NavLink>
                        </NavItem>
                        <NavItem>
                            <Dropdown
                                isOpen={this.state.navDropdownOpen}
                                toggle={() => ''}
                                onMouseOver={this.toggleDropdown}
                                onMouseEnter={this.toggleDropdown}
                                onMouseLeave={this.toggleDropdown}
                                >
                                <DropdownToggle nav caret>
                                    <span className='mr-2'>Portfolio</span>
                                </DropdownToggle>
                                <DropdownMenu right basic>
                                    <DropdownItem>
                                        <Link to='/photography'>
                                            Photography
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to='/svip'>
                                            Coursework
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to='/dev'>
                                            Web Development
                                        </Link>
                                    </DropdownItem>
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
