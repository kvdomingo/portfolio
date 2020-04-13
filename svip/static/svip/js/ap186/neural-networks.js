var e = React.createElement;

const funcfit_data = [
    { url: 'fit-1-pred.png', caption: 'linear', key: 'fig-pred-1' },
    { url: 'fit-2-pred.png', caption: 'quadratic', key: 'fig-pred-2' },
    { url: 'fit-3-pred.png', caption: 'cubic', key: 'fig-pred-3' },
    { url: 'fit-tanh-pred.png', caption: 'hyperbolic tangent', key: 'fig-pred-tanh' },
    { url: 'fit-sigmoid-pred.png', caption: 'logistic sigmoid', key: 'fig-pred-sigmoid' },
    { url: 'fit-sin1Hz-pred.png', caption: '1 Hz sine', key: 'fig-pred-sin' },
];

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        funcfit_data.map((image, i) => e(
            MultiFigure,
            { ...image, id: image.key, folder: '17-NeuralNetworks' },
            null,
        )),
        document.querySelector('#fig-preds div'),
    );
});
