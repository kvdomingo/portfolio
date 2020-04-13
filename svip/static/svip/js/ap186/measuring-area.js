var e = React.createElement;

class SubfigureCap extends React.Component {
    constructor(props) {
        super(props);
    }

    capitalize(s) {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    render() {
        return this.props.images.map((image, i) => [
            e(
                'div',
                { className: 'col' },
                [
                    e(
                        'img',
                        {
                            className: 'cld-responsive img-fluid mx-auto',
                            'data-src': 'https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/svip/186/4-MeasuringArea/' + image + '.png',
                            key: i,
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
                                    className: 'd-inline text-capitalize',
                                    key: i,
                                },
                                image.split('_').slice(-1)[0]
                            )
                        ]
                    ),
                ]
            )
        ]);
    }
}

const algo_data = [
    'spot', 'Sobel', 'Prewitt', 'Laplacian', 'Canny'
];

const shape_data = [
    'circle', 'square', 'trapezoid', 'triangle'
];

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        e(
            SubfigureCap,
            { images: shape_data },
            null,
        ),
        document.querySelector('#fig-shapes div'),
    );

    for (let s in shape_data) {
        var data = [];
        algo_data.forEach((item, i) => {
            data.push(`${shape_data[s]}_${item.toLowerCase()}`);
        });

        ReactDOM.render(
            e(
                SubfigureCap,
                { images: data },
                null
            ),
            document.querySelector(`#fig-${shape_data[s]}s div`),
        );
    }
});
