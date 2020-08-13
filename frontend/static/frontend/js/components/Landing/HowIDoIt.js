import React from 'react';
import {
    MDBTypography as Typography,
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
} from 'mdbreact';
import tech from './Technologies.json';


export default class WhatIDo extends React.Component {
    render() {
        const techStack = Object.keys(tech);
        return (
            <Container fluid className='py-5'>
                <Container className='py-5'>
                    <div data-aos='fade-up'>
                        <Typography tag='h1' variant='h1-responsive' className='text-center section-header'>
                            How I Do It
                        </Typography>
                        <hr className='grey darken-1 mt-4 mb-5' />
                        {techStack.map((head, i) => (
                            <div
                                key={i}
                                data-aos='fade-up'
                                className='mb-5'
                            >
                                <Row>
                                    <Col md='3'>
                                        <Typography
                                            tag='h4'
                                            variant='h2-responsive'
                                            className='my-4 text-md-right section-header'
                                        >
                                            {head}
                                        </Typography>
                                    </Col>
                                    <Col md='9' className='pl-0 pl-md-4' style={{ borderLeft: "1px solid #ccc" }}>
                                        <Row className='row-cols-2 row-cols-md-6'>
                                            {tech[head].map((t, i) => (
                                                <Col className='my-auto pb-4' key={i}>
                                                    <img src={t.src} className='img-fluid' alt={t.alt} />
                                                </Col>
                                            ))}
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                </Container>
            </Container>
        );
    }
}
