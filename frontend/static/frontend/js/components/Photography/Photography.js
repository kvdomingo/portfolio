import React, { Component, lazy } from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBNav as Nav,
} from 'mdbreact';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import Lightbox from 'simple-react-lightbox';

const Gallery = lazy(() => import('./Gallery'));
const Clients = lazy(() => import('./Clients'));


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
        this.handleActivePill = this.handleActivePill.bind(this);
    }

    componentDidMount() {
        this.handleActivePill();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activePage !== prevState.activePage) {
            this.handleActivePill();
        }
    }

    handleActivePill() {
        let url = window.location.pathname;
        let activePage = (url.split('/').slice(-1)[0] === 'photography')
            ? 'latest'
            : url.split('/').slice(-1)[0];
        if (url.split('/').slice(-2)[0] === 'clients') activePage = 'clients';
        this.setState({ activePage });
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
                            <Link
                                to={`${path}`}
                                onClick={(e) => this.togglePills(e, 'latest')}
                                className={`nav-link my-1 ${(this.state.activePage === 'latest')? 'active' : null}`}
                                >
                                latest
                            </Link>
                            <Link
                                to={`${url}/portraits`}
                                onClick={(e) => this.togglePills(e, 'portraits')}
                                className={`nav-link my-1 ${(this.state.activePage === 'portraits')? 'active' : null}`}
                                >
                                portraits
                            </Link>
                            <Link
                                to={`${url}/live`}
                                onClick={(e) => this.togglePills(e, 'live')}
                                className={`nav-link my-1 ${(this.state.activePage === 'live')? 'active' : null}`}
                                >
                                live
                            </Link>
                            <Link
                                to={`${url}/clients`}
                                onClick={(e) => this.togglePills(e, 'clients')}
                                className={`nav-link my-1 ${(this.state.activePage === 'clients')? 'active' : null}`}
                                >
                                clients
                            </Link>
                            <Link
                                to={`${url}/samoetikerffa`}
                                onClick={(e) => this.togglePills(e, 'samoetikerffa')}
                                className={`nav-link my-1 ${(this.state.activePage === 'samoetikerffa')? 'active' : null}`}
                                >
                                #samoetikerffa
                            </Link>
                        </Nav>
                    </Col>
                    <Col lg='10' className='pr-lg-5'>
                        <Switch>
                            <Route exact path={`${path}/clients`}>
                                <Clients />
                            </Route>
                            <Route path={`${path}/:photogPage`}>
                                <Lightbox>
                                    <Gallery key={this.state.activePage} />
                                </Lightbox>
                            </Route>
                            <Route exact path={path}>
                                <Lightbox>
                                    <Gallery key={this.state.activePage} />
                                </Lightbox>
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Photography);
