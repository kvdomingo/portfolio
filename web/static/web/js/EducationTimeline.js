var e = React.createElement;

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
        institute: 'Continuing Education Module',
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
        return e(
            'li',
            null,
            [
                e(
                    'h2',
                    { className: 'h5 mb-0 d-md-inline'},
                    this.props.university
                ),
                e(
                    'div',
                    { className: 'timeline-date text-muted float-md-right my-md-0 my-2' },
                    [
                        e(
                            'i',
                            { className: 'far fa-clock mr-1' },
                            null,
                        ),
                    ],
                    `${this.props.startDate} – ${this.props.endDate}`,
                ),
                e(
                    'p',
                    { className: 'lead my-0' },
                    this.props.institute,
                ),
                this.props.course.map(c => e(
                    'p',
                    { className: 'text-muted my-0' },
                    c,
                )),
            ],
        );
    }
}
