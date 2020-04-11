var e = React.createElement;

class Subfigure extends React.Component {
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
                        'data-src': 'https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/svip/186/7-ImageSegment/' + this.props.url,
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

const check_data = [
    { url: 'grayscale_check.jpg', caption: '', key: 'fig-check-orig' },
    { url: 'check_hist.png', caption: '', key: 'fig-check-hist' },
];

const check_seg_data = [
    { url: 'check_thres125.png', caption: 'subjectively picked', key: 'fig-check-seg-random' },
    { url: 'check_otsu.png', caption: "Otsu's method", key: 'fig-check-seg-otsu' },
];

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        check_data.map((image, i) => e(
            Subfigure,
            { ...image, id: image.key },
            null,
        )),
        document.querySelector('#fig-check div'),
    );

    ReactDOM.render(
        check_seg_data.map((image, i) => e(
            Subfigure,
            { ...image, id: image.key },
            null,
        )),
        document.querySelector('#fig-check-seg div'),
    );
});
