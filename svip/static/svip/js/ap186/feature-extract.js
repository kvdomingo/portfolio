var e = React.createElement;

const frame_data = [
    { url: 'ab_space.png', caption: 'a*-b*', key: 'fig-projection-ab' },
    { url: 'ae_space.png', caption: 'a*-e', key: 'fig-projection-ae' },
    { url: 'be_space.png', caption: 'b*-e', key: 'fig-projection-be' },
];

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        frame_data.map((image, i) => e(
            MultiFigure,
            { ...image, id: image.key, folder: '12-FeatureExtract', subject: '186' },
            null,
        )),
        document.querySelector('#fig-projection div'),
    );
});
