var e = React.createElement;

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
            MultiFigure,
            { ...image, id: image.key, folder: '7-ImageSegment', subject: '186' },
            null,
        )),
        document.querySelector('#fig-check div'),
    );

    ReactDOM.render(
        check_seg_data.map((image, i) => e(
            MultiFigure,
            { ...image, id: image.key, folder: '7-ImageSegment', subject: '186' },
            null,
        )),
        document.querySelector('#fig-check-seg div'),
    );
});
