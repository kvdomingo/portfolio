var e = React.createElement;

const frame_data = [
    { url: '0.png', caption: 'frame 1', key: 'fig-frame-1' },
    { url: '9.png', caption: 'frame 10', key: 'fig-frame-10' },
    { url: '18.png', caption: 'frame 19', key: 'fig-frame-19' },
    { url: '22.png', caption: 'frame 23', key: 'fig-frame-23' },
    { url: '28.png', caption: 'frame 29', key: 'fig-frame-29' },
    { url: '29.png', caption: 'frame 30', key: 'fig-frame-30' },
];

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        frame_data.map((image, i) => e(
            MultiFigure,
            { ...image, id: image.key, folder: '11-BasicVideo', subject: '186' },
            null,
        )),
        document.querySelector('#fig-frames div'),
    );
});
