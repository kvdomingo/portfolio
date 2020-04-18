const educationInfo = [
    {
        key: 'upd',
        university: 'University of the Philippines',
        startDate: 'Aug 2015',
        endDate: 'Jun 2020 (exp.)',
        institute: 'National Institute of Physics',
        course: ['B.S. Applied Physics (Major in Instrumentation)'],
    },
    {
        key: 'cs50',
        university: 'Harvard University',
        startDate: 'Dec 2019',
        endDate: 'Apr 2020',
        institute: 'Division of Continuing Education',
        course: [
            'CS50W: Web Programming with Python and JavaScript',
            'CS50M: Mobile App Development with React Native',
        ],
    }
];

class EducationTimeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <h4 className='h4-responsive mb-0 d-md-inline'>{this.props.university}</h4>
                <div className='timeline-date text-muted float-md-right my-md-0 my-2'>
                    <i className='far fa-clock mr-1'></i>
                    {`${this.props.startDate} - ${this.props.endDate}`}
                </div>
                <p className='lead my-0'>{this.props.institute}</p>
                {this.props.course.map(c =>
                    <React.Fragment>
                        <p className='text-muted my-0'>{c}</p>
                    </React.Fragment>
                )}
            </li>
        );
    }
}
