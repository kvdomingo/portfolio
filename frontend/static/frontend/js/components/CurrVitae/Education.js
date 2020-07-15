import React from 'react';
import {
    MDBTypography as Type,
    MDBIcon as Icon,
} from "mdbreact";
import dateFormat from 'dateformat';
import TimelineSection from "./TimelineSection";


export default class Education extends React.Component {
    state = {
        data: [],
    }

    componentDidMount() {
        fetch('/api/cv/education')
            .then(res => res.json())
            .then(data => {
                data.forEach((dat, i) => {
                    dat.start_date = dateFormat(new Date(dat.start_date), 'mmm yyyy');
                    dat.end_date = dateFormat(new Date(dat.end_date), 'mmm yyyy');
                });
                this.setState({ data });
            });
    }

    render() {
        let { data } = this.state;

        return (
            <TimelineSection sectionName='Education' icon='graduation-cap'>
                <ul className='timeline'>
                    {data.map((dat, i) => (
                        <li key={i}>
                            <Type tag='h4' variant='h4-responsive' className='mb-0 d-md-inline'>
                                {dat.university}
                            </Type>
                            <div className='timeline-date text-muted float-md-right my-md-0 my-2'>
                                <Icon far icon='clock' className='mr-1'/>
                                {dat.start_date} – {dat.end_date}
                            </div>
                            <p className='lead py-0'>
                                <a
                                    href={dat.department_url}
                                    target='_blank' rel='noopener noreferrer'
                                    style={{ color: 'mediumvioletred' }}
                                    >
                                    {dat.department}
                                </a>
                            </p>
                            <div className='mt-2 mb-5'>
                                {dat.degree}
                            </div>
                        </li>
                    ))}
                </ul>
            </TimelineSection>
        );
    }
}