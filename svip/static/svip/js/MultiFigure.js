var e = React.createElement;

class MultiFigure extends React.Component {
    constructor(props) {
        super(props);
    }

    capitalize(s) {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    render() {
        return e(
            'div',
            { className: 'col my-auto' },
            [
                e(
                    'img',
                    {
                        id : this.props.id,
                        className: 'cld-responsive img-fluid mx-auto',
                        'data-src': `https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/svip/${this.props.subject}/${this.props.folder}/${this.props.url}`,
                    },
                    null,
                ),
                e(
                    'div',
                    { className: 'subfigure d-inline' },
                    [
                        e(
                            'p',
                            {
                                className: 'd-inline',
                            },
                            this.props.caption
                        )
                    ]
                ),
            ],
        );
    }
}
