class TimelineSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <h1 className='h2-responsive py-4'>
                    <i className={`${this.props.icon} mr-3`}></i>
                    {this.props.sectionName}
                </h1>
                <div className='container px-md-5'>
                    <ul className='timeline'>
                        {this.props.elements.map((el, i) =>
                            <TimelineElements { ...el } key={i} />
                        )}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}
