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
import { Link, useLocation } from 'react-router-dom';
import './index.css'


export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: window.location.pathname,
            navClass: 'px-5 py-3',
            navFixed: '', /* (pathName === `${this.props.urlPrefix}/`)
                ? 'fixed-top navbar-dark'
                : 'sticky-top navbar-light', */
            navBrand: '', /* (pathName === `${this.props.urlPrefix}/`)
                ? 'logo/logo-white'
                : 'logo/logo-black', */
            navIsOpen: false,
            navDropdownOpen: false,
            navBackground: '', // 'rgba(0, 0, 0, 0.0)',
        };
        this.styles = {
            /* navbar: {
                background: (window.location.pathname === `${this.props.urlPrefix}/`)
                ? 'rgb(0, 0, 0)'
                : 'rgba(255, 255, 255, 0.90)',
            }, */
            navDropdown: {
                backgroundColor: 'rgba(255, 255, 255, 0.90)',
            },
        };

        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleNavScroll = this.handleNavScroll.bind(this);
    }

    componentDidMount() {
        if (this.props.homeExp.test(this.state.currentPath)) {
            this.setState({
                navFixed: 'fixed-top navbar-dark',
                navBrand: 'logo/logo-white',
                navBackground: 'rgb(0, 0, 0)',
            });
        } else {
            this.setState({
                navFixed: 'sticky-top navbar-light',
                navBrand: 'logo/logo-black',
                navBackground: 'rgba(255, 255, 255, 0.90)',
            });
        }
        window.addEventListener('scroll', this.handleNavScroll);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.currentPath !== nextState.currentPath) {
            this.setState({ currentPath: nextState.currentPath });
            return true;
        }
        return false;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleNavScroll);
    }

    handleNavScroll() {
        ((window.scrollY < 30) && (this.props.homeExp.test(this.state.currentPath)))
            ? this.setState({ navBackground: 'rgba(0, 0, 0, 0.0)' })
            : this.setState({ navBackground: 'rgba(0, 0, 0, 0.90)' });
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
                className={`${this.state.navFixed} navbar-slick ${this.state.navClass}`}
                style={{
                    background: this.state.navBackground,
                }}
                >
                <NavbarBrand>
                    <Link to={`/${this.props.urlPrefix}`}>
                        <Image
                            publicId={this.state.navBrand}
                            cloudName='kdphotography-assets'
                            secure={true}
                            className='navbar-slick-brand'
                            alt='Kenneth V. Domingo logo'
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
                            <NavLink to={`/${this.props.urlPrefix}`}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={`/${this.props.urlPrefix}cv`}>CV</NavLink>
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
                                        <Link to={`/${this.props.urlPrefix}photography`}>
                                            Photography
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={`/${this.props.urlPrefix}svip`}>
                                            Coursework
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={`/${this.props.urlPrefix}dev`}>
                                            Development
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
