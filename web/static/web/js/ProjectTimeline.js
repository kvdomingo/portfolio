var e = React.createElement;

const projectInfo = [
    {
        key: 'proj-traceph',
        name: 'TracePH',
        startDate: 'Mar 2020',
        endDate: 'present',
        href: 'https://traceph.org/',
        description: 'Volunteered as one of the designers of an Android/iOS app to perform contact tracing of COVID-19 cases in the Philippines, spearheaded by the UP Diliman College of Science.',
    },
    {
        key: 'covid19ph',
        name: 'COVID-19 PH Tracker Dashboard',
        startDate: 'Mar 2020',
        endDate: 'present',
        href: 'https://ncovenience.herokuapp.com/',
        description: 'Designed an information hub, dashboard, and API regarding COVID-19 data in the Philippines.',
    },
    {
        key: 'primerdriver',
        name: 'PrimerDriver',
        startDate: 'Jan 2020',
        endDate: 'Feb 2020',
        href: 'https://primerdriver.herokuapp.com/',
        description: 'A command-line tool and web application to design PCR primers for site-directed mutagenesis.',
    },
];

class ProjectTimeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return e(
            'li',
            { className: 'py-1' },
            [
                e(
                    'h2',
                    { className: 'h5 mb-0 d-md-inline' },
                    this.props.name,
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
                    { className: 'lead my-0 pb-3' },
                    [
                        e(
                            'a',
                            { href: this.props.href, target: '_blank' },
                            'Project Website',
                        ),
                    ],
                ),
                e(
                    'p',
                    null,
                    this.props.description,
                ),
            ],
        );
    }
}
