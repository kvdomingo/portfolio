import React, { Component } from 'react';
import { MDBContainer as Container } from 'mdbreact';
import './CV.css';
import TimelineSection from './TimelineSection';
import cvData from './CvData.json';


export default class Cv extends Component {
    render() {
        let sections = Object.keys(cvData);
        return (
            <Container className='px-md-5 pb-4'>
                {sections.map((sec, i) => (
                    <TimelineSection { ...cvData[sec] } />
                ))}
            </Container>
        );
    }
}
