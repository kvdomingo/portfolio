class CarouselFiller extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            this.props.urls.map((url, i) =>
                <div className='carousel-cell'>
                    <img className='card-img-top img-fluid cld-responsive' data-src={url} />
                </div>
            )
        );
    }
}
