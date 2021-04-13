var e = React.createElement;

var contour_data = [
    { url: '113.png', caption: '', key: 'fig-charge-distribution' },
    { url: '115.png', caption: '', key: 'fig-charge-contour' },
];

var field_data = [
    { url: '117.png', caption: '', key: 'fig-field-close' },
    { url: '117-64.png', caption: '', key: 'fig-field-far' },
];

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        contour_data.map((image, i) => e(
            MultiFigure,
            { ...image, id: image.key, folder: 'Proj-MultipoleExpansion', subject: '156' },
            null,
        )),
        document.querySelector('#fig-charge div'),
    );

    ReactDOM.render(
        field_data.map((image, i) => e(
            MultiFigure,
            { ...image, id: image.key, folder: 'Proj-MultipoleExpansion', subject: '156' },
            null,
        )),
        document.querySelector('#fig-field div'),
    );
});
