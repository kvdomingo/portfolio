import React, { Component, lazy } from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBNav as Nav,
} from 'mdbreact';
import { withRouter } from 'react-router-dom';
import Sidenav from './Sidenav';
import './Svip.css';

const SvipGallery = lazy(() => import('./SvipGallery'));


const styles = {
    navPills: {
        position: 'sticky',
        top: '100px'
    }
};

export default withRouter(class SvipIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: '',
            courses: [],
            coursesIsLoaded: false,
            posts: [],
        };

        this.handleActivePill = this.handleActivePill.bind(this);
        this.togglePills = this.togglePills.bind(this);
    }

    componentDidMount() {
        this.handleActivePill();
        let { courseSlug } = this.props.match.params;
        fetch(`/api/svip/blogpost?subject__slug=${courseSlug}`)
            .then(res => res.json())
            .then(posts => this.setState({ posts }));
        fetch('/api/svip/course')
            .then(res => res.json())
            .then(courses => this.setState({
                courses,
                coursesIsLoaded: true
            }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activePage !== prevState.activePage) {
            this.handleActivePill();
        }
    }

    handleActivePill() {
        let url = window.location.pathname;
        let activePage = url.split('/').slice(-1)[0];
        this.setState({ activePage });
    }

    togglePills(e, activePage) {
        this.setState({ activePage });
    }

    render() {
        return ((!this.state.coursesIsLoaded)
            ?  <div className='text-center my-5 mt-5 spinner-grow spinner-grow-lg' />
            : <Container fluid className='my-5'>
                <Row>
                    <Col md='2' className='pt-2 pb-4'>
                        <Nav tag='div' className='nav-pills flex-column pl-md-2 pl-0 text-md-left text-center' style={styles.navPills} orientation='vertical'>
                            <Sidenav courses={this.state.courses} togglePills={this.togglePills} />
                        </Nav>
                    </Col>
                    <Col md='10' className='px-md-3 px-0 ml-0'>
                        <SvipGallery key={this.state.activePage} courses={this.state.courses} />
                    </Col>
                </Row>
            </Container>
        );
    }
})
