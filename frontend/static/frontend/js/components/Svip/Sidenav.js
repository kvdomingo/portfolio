import React, { Component } from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBNav as Nav,
} from 'mdbreact';
import { Link, withRouter } from 'react-router-dom';
import './Svip.css';


export default withRouter(class Sidenav extends Component {
    render() {
        let { url } = this.props.match;
        url = url.split('/').slice(0, -1).join('/');
        let currentPage = window.location.pathname.split('/').slice(-1)[0];
        return (
            <div>
                {this.props.courses.map((course, i) => (
                    <Link
                        key={i}
                        to={`${url}/${course.slug}`}
                        onClick={(e) => this.props.togglePills(e, course.slug)}
                        className={`nav-link my-1 ${ (currentPage === course.slug)? 'active': null }`}
                        >
                        {course.name}
                        <br />
                        <small>{course.title}</small>
                    </Link>
                ))}
            </div>
        );
    }
})
