var e = React.createElement;

const hist_data = [
    { url: 'area_hist.png', caption: 'area', key: 'fig-hist-area' },
    { url: 'ecc_hist.png', caption: 'eccentricity', key: 'fig-hist-ecc' },
    { url: 'majax_hist.png', caption: 'major axis length', key: 'fig-hist-major' },
    { url: 'per_hist.png', caption: 'perimeter', key: 'fig-hist-perimeter' },
];

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        hist_data.map((image, i) => e(
            MultiFigure,
            { ...image, id: image.key, folder: '10-BlobAnalysis', subject: '186' },
            null,
        )),
        document.querySelector('#fig-hists div'),
    );
});
