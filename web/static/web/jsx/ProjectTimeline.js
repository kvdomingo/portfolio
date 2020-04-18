var projectInfo = [
    {
        key: 'proj-detectph',
        name: 'DetectPH',
        startDate: 'Mar 2020',
        endDate: 'present',
        site: 'https://detectph.com/',
        download: null,
        description: 'Volunteered as one of the designers of an Android/iOS app to perform contact tracing of COVID-19 cases in the Philippines, spearheaded by the UP Diliman College of Science.',
    },
    {
        key: 'covid19ph',
        name: 'COVID-19 PH Tracker Dashboard',
        startDate: 'Mar 2020',
        endDate: 'present',
        site: 'https://ncovenience.herokuapp.com/',
        download: null,
        description: 'Designed an information hub, dashboard, and API regarding COVID-19 data in the Philippines.',
    },
    {
        key: 'primerdriver',
        name: 'PrimerDriver',
        startDate: 'Jan 2020',
        endDate: 'Feb 2020',
        site: 'https://primerdriver.herokuapp.com/',
        download: 'https://github.com/kvdomingo/primerdriver/releases',
        description: 'A command-line tool and web application to design PCR primers for site-directed mutagenesis.',
    },
];

class ProjectTimeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className='py-1'>
                <h4 className='h4-responsive mb-0 d-md-inline'>{ this.props.name }</h4>
                <div className='timeline-date text-muted float-md-right my-md-0 my-2'>
                    <i className='far fa-clock mr-1'></i>
                    { `${this.props.startDate} - ${this.props.endDate}` }
                </div>
                <p className='lead my-0 pb-3'>
                    <a href={ this.props.site } target='_blank'>Project Website </a>
                    { (this.props.download) &&
                        <React.Fragment>
                            | <a href={this.props.download} target='_blank'>Download</a>
                        </React.Fragment>
                    }
                </p>
                <p>{ this.props.description }</p>
            </li>
        );
    }
}
