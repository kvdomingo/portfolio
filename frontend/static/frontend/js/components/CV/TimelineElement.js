import React from 'react';
import {
    MDBTypography as Typography,
    MDBIcon as Icon,
    MDBBtn as Button,
} from 'mdbreact';
import PropTypes from 'prop-types';


function TimelineElement(props) {
    return (
        <li>
            <Typography tag='h4' variant='h4-responsive' className='mb-0 d-md-inline'>
                {props.title}
            </Typography>
            <div className='timeline-date text-muted float-md-right my-md-0 my-2'>
                <Icon far icon='clock' className='mr-1' />
                {props.startDate === ''
                    ? `${props.endDate}`
                    : `${props.startDate} – ${props.endDate}`
                }
            </div>
            <p className='lead py-0'>
                {props.connection.map((conn, i) => {
                    if (i === 0) {
                        return (
                            <React.Fragment key={i}>
                                <a href={conn.href} target='_blank' rel='noopener noreferrer'>{conn.name} </a>
                            </React.Fragment>
                        );
                    } else {
                        return(
                            <React.Fragment key={i}>
                                | <a href={conn.href} target='_blank' rel='noopener noreferrer'>{conn.name}</a>
                            </React.Fragment>
                        );
                    }
                })}
            </p>
            <div className='mt-2 mb-5'>
                {props.description.map((desc, i) => (
                    <p className='my-0' key={i}>{desc}</p>
                ))}
                {(props.related)
                    ? <Button tag='a' href={props.related} className='ml-0 mt-3' outline color='black' size='sm'>See in portfolio</Button>
                    : null
                }
            </div>
        </li>
    );
}

TimelineElement.propTypes = {
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string.isRequired,
    connection: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
    })).isRequired,
    description: PropTypes.arrayOf(PropTypes.string).isRequired,
    related: PropTypes.string,
};

export default TimelineElement;
