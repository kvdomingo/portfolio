import React from 'react';
import {
    MDBTypography as Typography,
    MDBContainer as Container,
} from 'mdbreact';
import PropTypes from 'prop-types';
import TimelineElement from './TimelineElement';


function TimelineSection(props) {
    return (
        <div>
            <Typography tag='h2' variant='h2-responsive' className='py-4'>
                <i className={`${props.icon} mr-3`} />
                {props.sectionName}
            </Typography>
            <Container className='px-md-5'>
                <ul className='timeline'>
                    {props.elements.map((el, i) => (
                        <TimelineElement { ...el } key={i} />
                    ))}
                </ul>
            </Container>
        </div>
    );
}

TimelineSection.propTypes = {
    sectionName: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TimelineSection;
