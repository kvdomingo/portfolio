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
import { Link } from 'react-router-dom';
import './index.css'
import PropTypes from 'prop-types';


export default class NavBar extends React.Component {
    static propTypes = {
        activePage: PropTypes.string.isRequired,
        activePageHandler: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            navClass: 'px-5 py-3',
            navFixed: (this.props.activePage === 'home')
                ? 'fixed-top navbar-dark'
                : 'sticky-top navbar-light',
            navBrand: (this.props.activePage === 'home')
                ? 'logo/logo-white'
                : 'logo/logo-black',
            navIsOpen: false,
            navDropdownOpen: false,
            navBackground: 'rgba(0, 0, 0, 0.0)',
        };
        this.styles = {
            navbar: {
                background: (this.props.activePage === 'home')
                ? 'rgb(0, 0, 0)'
                : 'rgba(255, 255, 255, 0.90)',
            },
            navDropdown: {
                backgroundColor: 'rgba(255, 255, 255, 0.90)',
            },
        };

        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleNavScroll = this.handleNavScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleNavScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleNavScroll);
    }

    handleNavScroll() {
        (window.scrollY < 30)
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
                    ...this.styles.navbar,
                    background: this.state.navBackground
                }}
                >
                <NavbarBrand>
                    <Link to={`${this.props.urlPrefix}/`}>
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
                            <NavLink to={`${this.props.urlPrefix}/`}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={`${this.props.urlPrefix}/cv`}>CV</NavLink>
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
                                        <Link to={`${this.props.urlPrefix}/photography`}>
                                            Photography
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={`${this.props.urlPrefix}/svip`}>
                                            Coursework
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={`${this.props.urlPrefix}/dev`}>
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
