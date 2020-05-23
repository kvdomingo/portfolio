import React, { Component } from 'react';
import { MDBContainer as Container } from 'mdbreact';
import './CurrVitae.css';
import TimelineSection from './TimelineSection';
import cvData from './CvData.json';
import TitleComponent from '../TitleComponent';


export default class Cv extends Component {
    render() {
        let sections = Object.keys(cvData);
        return (
            <React.Fragment>
                <TitleComponent
                    title='CV'
                    description='Curriculum Vitae (CV) of Kenneth V. Domingo including educational attainment, work experience, and projects'
                    keywords='Kenneth V. Domingo, Kenneth Domingo Photography, curriculum vitae, Python, photography, physics, applied physics, kvdomingo'
                    />
                <Container className='px-md-5 pb-4'>
                    {sections.map((sec, i) => (
                        <TimelineSection key={i} { ...cvData[sec] } />
                    ))}
                </Container>
            </React.Fragment>
        );
    }
}
