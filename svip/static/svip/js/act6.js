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
                        'data-src': 'https://res.cloudinary.com/kdphotography-assets/image/upload/c_scale,w_auto,dpr_auto/v1/svip/186/6-EnhanceColor/' + this.props.url + '.jpg',
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
    { url: 'original', caption: 'Original', key: 'fig-original' },
    { url: 'contrast_stretch', caption: 'Contrast-stretched (CS)', key: 'fig-constretch' },
    { url: 'grayworld', caption: 'Gray world (GW)', key: 'fig-grayworld' },
    { url: 'whitepatch', caption: 'White patch (WP)', key: 'fig-whitepatch' },
    { url: 'orig_hist', caption: 'Original histogram', key: 'fig-orig-hist' },
    { url: 'cs_hist', caption: 'CS histogram', key: 'fig-cs-hist' },
    { url: 'gw_hist', caption: 'GW histogram', key: 'fig-gw-hist' },
    { url: 'wp_hist', caption: 'WP histogram', key: 'fig-wp-hist' },
];

const wb_data = [
    { url: 'contrast_stretch', caption: 'CS', key: 'fig-wb-constretch' },
    { url: 'grayworld', caption: 'GW', key: 'fig-wb-grayworld' },
    { url: 'awbaaet_out', caption: 'AWBAAET', key: 'fig-wb-awbaet' },
    { url: 'cs_hist', caption: 'CS histogram', key: 'fig-cs-hist' },
    { url: 'gw_hist', caption: 'GW histogram', key: 'fig-gw-hist' },
    { url: 'awbaaet_hist', caption: 'AWBAAET histogram', key: 'fig-awbaet-hist' },
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
        wb_data.map((image, i) => e(
            Subfigure,
            { ...image, id: image.key },
            null,
        )),
        document.querySelector('#fig-awbaet div'),
    );
});
