var workInfo = [
    {
        key: 'detectph',
        position: 'Backend/Web Developer',
        startDate: 'Mar 2020',
        endDate: 'present',
        company: 'DetectPH',
        href: 'https://detectph.com/',
        description: 'Volunteer developer for a COVID-19 contact tracing app in the Philippines.'
    },
    {
        key: 'upiris-ec',
        position: 'Executive Officer for Promotions and Documentation',
        startDate: 'Jan 2020',
        endDate: 'present',
        company: 'UP Iris',
        href: 'https://facebook.com/upiris',
        description: 'Oversaw all organization matters regarding publicity and documentation of both internal and external events.'
    },
    {
        key: 'upiris',
        position: 'Photographer',
        startDate: 'May 2019',
        endDate: 'present',
        company: 'UP Iris',
        href: 'https://facebook.com/upiris',
        description: null,
    },
    {
        key: 'ipl',
        position: 'Student Researcher',
        startDate: 'Oct 2017',
        endDate: 'present',
        company: 'Instrumentation Physics Laboratory',
        href: 'https://sites.google.com/site/instrumentationphysicslab/',
        description: 'Processing and analysis of videos, images, and other signals using classical signal processing methods, compressive sensing, and machine learning.',
    },
    {
        key: 'pgc',
        position: 'Intern',
        startDate: 'Jan 2020',
        endDate: 'Feb 2020',
        company: 'Philippine Genome Center',
        href: 'https://pgc.up.edu.ph/',
        description: 'Underwent training in bioinformatics; developed a command-line tool and web application for designing primers for site-directed mutagenesis.',
    },
    {
        key: 'trin',
        position: 'Intern',
        startDate: 'Jun 2019',
        endDate: 'Nov 2019',
        company: 'The Rest is Noise PH',
        href: 'https://therestisnoiseph.com/',
        description: 'Provided analytics to determine key points to target in order to maximize marketing; involved in project planning and on-site production for All of The Noise 2019 held at Century City Mall, City of Makati.',
    },
    {
        key: 'philcomars',
        position: 'Student Assistant',
        startDate: 'Dec 2018',
        endDate: 'Jan 2019',
        company: 'Philippine Coral Reef and Mangrove Remote Sensing Project',
        href: 'https://202.90.159.82/philcomars/',
        description: 'Performed ground-truth validation of images involving corals classified by a deep neural network. ',
    },
];

class WorkTimeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className='py-1'>
                <h4 className='h4-responsive mb-0 d-md-inline'>{ this.props.position }</h4>
                <div className='timeline-date text-muted float-md-right my-md-0 my-2'>
                    <i className='far fa-clock mr-1'></i>
                    { `${this.props.startDate} - ${this.props.endDate}` }
                </div>
                <p className='lead my-0 pb-3'>
                    <a href={ this.props.href } target='_blank'>{ this.props.company }</a>
                </p>
                <p>{ this.props.description }</p>
            </li>
        );
    }
}
