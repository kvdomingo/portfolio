var e = React.createElement;

var leaf_data = [
    { url: 'leaf1.png', caption: 'actual', key: 'fig-rendered-actual' },
    { url: 'render.png', caption: 'rendered', key: 'fig-rendered-color' },
];

var macbeth_data = [
    { url: 'macbeth.png', caption: 'actual', key: 'fig-macbeth-actual' },
    { url: 'mac_rendered.png', caption: 'rendered', key: 'fig-macbeth-color' },
];

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        leaf_data.map((image, i) => e(
            MultiFigure,
            { ...image, id: image.key, folder: '4-RenderColor', subject: '187' },
            null,
        )),
        document.querySelector('#fig-rendered div'),
    );

    ReactDOM.render(
        macbeth_data.map((image, i) => e(
            MultiFigure,
            { ...image, id: image.key, folder: '4-RenderColor', subject: '187' },
            null,
        )),
        document.querySelector('#fig-macbeth div'),
    );
});
