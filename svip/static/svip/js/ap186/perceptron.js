var e = React.createElement;

var data = [
    { url: 'ban-app_decision.png', caption: 'banana-apple', key: 'fig-ban-app' },
    { url: 'ban-ora_decision.png', caption: 'banana-orange', key: 'fig-ban-ora' },
    { url: 'app-ora_decision.png', caption: 'apple-orange', key: 'fig-app-ora' },
];

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        data.map((image, i) => e(
            MultiFigure,
            { ...image, id: image.key, folder: '13-Perceptron' },
            null,
        )),
        document.querySelector('#fig-decision div'),
    );
});
