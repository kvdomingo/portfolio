import React, { Component, lazy } from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBNav as Nav,
    MDBNavLink as NavLink,
} from 'mdbreact';
import { Route, Switch, withRouter } from 'react-router-dom';

const Gallery = lazy(() => import('./Gallery'));


const styles = {
    navPills: {
        position: 'sticky',
        top: '100px',
    },
};

class Photography extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: '',
        };

        this.togglePills = this.togglePills.bind(this);
    }

    componentDidMount() {
        let url = window.location.pathname;
        let activePage = (url.split('/').slice(-1)[0] === 'photography')
            ? url.split('/').slice(-1)[0]
            : 'latest';
        this.setState({ activePage });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activePage !== prevState.activePage) {
            let url = window.location.pathname;
            let activePage = (url.split('/').slice(-1)[0] === 'photography')
                ? url.split('/').slice(-1)[0]
                : 'latest';
            this.setState({ activePage });
        }
    }

    togglePills(e, activePage) {
        this.setState({ activePage });
    }

    render() {
        let { path, url } = this.props.match;
        return (
            <Container fluid className='my-5'>
                <Row>
                    <Col lg='2' className='pt-2 pb-4 px-lg-4'>
                        <Nav tag='div' className='nav-pills flex-column pl-md-2 pl-0 text-md-left text-center' style={styles.navPills} orientation='vertical'>
                            <NavLink
                                to={`${path}`}
                                active={this.state.activePage === 'latest'}
                                onClick={(e) => this.togglePills(e, 'latest')}
                                className='my-1'
                                >
                                latest
                            </NavLink>
                            <NavLink
                                to={`${url}/portraits`}
                                active={this.state.activePage === 'portraits'}
                                onClick={(e) => this.togglePills(e, 'portraits')}
                                className='my-1'
                                >
                                portraits
                            </NavLink>
                            <NavLink
                                to={`${url}/live`}
                                active={this.state.activePage === 'live'}
                                onClick={(e) => this.togglePills(e, 'live')}
                                className='my-1'
                                >
                                live
                            </NavLink>
                            <NavLink
                                to={`${url}/clients`}
                                active={this.state.activePage === 'clients'}
                                onClick={(e) => this.togglePills(e, 'clients')}
                                className='my-1'>
                                clients
                            </NavLink>
                            <NavLink
                                to={`${url}/samoetikerffa`}
                                active={this.state.activePage === 'samoetikerffa'}
                                onClick={(e) => this.togglePills(e, 'samoetikerffa')}
                                className='my-1'>
                                #samoetikerffa
                            </NavLink>
                        </Nav>
                    </Col>
                    <Col lg='10' className='pr-lg-5'>
                        <Switch>
                            <Route path={`${path}/:photogPage`} component={Gallery} />
                            <Route exact path={path} component={Gallery} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Photography);
