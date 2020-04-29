class TimelineElements extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <h4 className='h4-responsive mb-0 d-md-inline'>{this.props.title}</h4>
                <div className='timeline-date text-muted float-md-right my-md-0 my-2'>
                    <i className='far fa-clock mr-1'></i>
                    {this.props.startDate === '' ?
                        `${this.props.endDate}`
                        :
                        `${this.props.startDate} – ${this.props.endDate}`
                    }
                </div>
                <p className='lead my-0'>
                    {this.props.connection.map((conn, i) => {
                        if (i === 0) {
                            return (
                                <React.Fragment key={i}>
                                    <a href={conn.href} target='_blank'>{conn.name} </a>
                                </React.Fragment>
                            );
                        } else {
                            return (
                                <React.Fragment key={i}>
                                    | <a href={conn.href} target='_blank'>{conn.name}</a>
                                </React.Fragment>
                            );
                        }
                    })}
                </p>
                <div className='mt-2 mb-5'>
                    {this.props.description.map((desc, i) =>
                        <React.Fragment key={i}>
                            <p className='my-0'>{desc}</p>
                        </React.Fragment>
                    )}
                    {this.props.related ?
                        <a href={this.props.related} className='btn btn-sm btn-outline-black ml-0 mt-3'>See in portfolio</a>
                        :
                        null
                    }
                </div>
            </li>
        );
    }
}
