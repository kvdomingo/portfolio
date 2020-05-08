import React from 'react';
import {
    MDBCol as Col,
    MDBRow as Row,
    MDBTypography as Typography,
    MDBContainer as Container,
} from 'mdbreact';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';


export default class Photography extends React.Component {
    render() {
        return (
            <Container className='py-5' data-aos='fade-up'>
                <Row>
                    <Col md='6' className='my-auto'>
                        <Typography tag='h3' variant='h2-responsive' className='mb-3'>
                            Photography
                        </Typography>
                        <p className='mb-3'>
                            I started out photography in the summer of 2017, equipped with only my phone and a vision. I got my first SLR camera in the same year, and since then, my passion has only grown. Today, I continue to draw inspiration and learnings from established photographers, both foreign and local, in order to hone my own craft. I specialize in portrait, live music, and events photography&mdash;though I don't mind venturing into other fields every once in a while.
                        </p>
                        <Link to={`${this.props.urlPrefix}/photography`} className='btn btn-outline-white'>See portfolio</Link>
                    </Col>
                    <Col md='6' className='text-center'>
                        <Carousel />
                    </Col>
                </Row>
            </Container>
        );
    }
}
