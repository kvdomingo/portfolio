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
                        'data-src': 'https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/svip/186/5-EnhanceHistogram/' + this.props.url + '.png',
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

const image_data = [
    {
        url: 'original',
        caption: 'Original',
        key: 'fig-original',
    },
    {
        url: 'contrast_stretch',
        caption: 'Contrast-stretched (CS)',
        key: 'fig-constretch',
    },
    {
        url: 'hist_equal',
        caption: 'Histogram-equalized (HE)',
        key: 'fig-histeq',
    },
    {
        url: 'adapt_eq',
        caption: 'Nonlinear response (NL)',
        key: 'fig-nonlinear',
    },
    { url: 'orig_hist', caption: 'original histogram', key: 'fig-orig-hist' },
    { url: 'cs_hist', caption: 'CS histogram', key: 'fig-constretch-hist' },
    { url: 'histeq_hist', caption: 'HE histogram', key: 'fig-histeq-hist' },
    { url: 'adapteq_hist', caption: 'NL histogram', key: 'fig-nonlinear-hist' },
    { url: 'orig_cdf', caption: 'original CDF', key: 'fig-orig-cdf' },
    { url: 'cs_cdf', caption: 'CS CDF', key: 'fig-constretch-cdf' },
    { url: 'uniform_cdf', caption: 'HE CDF', key: 'fig-histeq-cdf' },
    { url: 'sigmoid_cdf', caption: 'NL CDF', key: 'fig-nonlinear-cdf' },
];

const crush_data = [
    { url: 'crush_cdf', caption: 'desired CDF', key: 'fig-sigmoid' },
    { url: 'crushed', caption: 'resultant image', key: 'fig-sigmoid-hist' },
    { url: 'crush_hist', caption: 'histogram', key: 'fig-sigmoid-cdf' },
];

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        image_data.map((image, i) => e(
            Subfigure,
            { ...image, id: image.key },
            null,
        )),
        document.querySelector('#fig-enhance div'),
    );

    ReactDOM.render(
        crush_data.map((image, i) => e(
            Subfigure,
            { ...image, id: image.key },
            null,
        )),
        document.querySelector('#fig-crushed div'),
    );
});
