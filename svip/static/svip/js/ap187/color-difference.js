var e = React.createElement;

class PopulateTable extends React.Component {
    constructor(props) {
        super(props);
        this.tabEl = [this.props.patch_id, this.props.lab, this.props.lch];
    }

    render() {
        return e(
            'tr',
            null,
            [
                this.tabEl.map((el, i) => e(
                    'td',
                    null,
                    el,
                )),
            ],
        );
    }
}

var color_data = {
    lab: [ 3.14, 4.43, 2.96, 2.40, 2.77, 3.11, 6.10, 3.76, 5.10, 1.80, 4.22, 6.12, 4.38, 2.58, 5.76, 6.29, 3.79, 4.12, 4.18, 3.62, 3.07, 2.54, 1.94, 1.37 ],
    lch: [ 3.10, 4.16, 2.67, 2.23, 2.65, 2.92, 6.04, 2.51, 5.04, 1.74, 3.60, 5.82, 2.49, 2.56, 5.73, 5.39, 3.54, 4.08, 4.14, 4.43, 3.92, 3.51, 1.98, 1.38 ],
};

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        Object.values(color_data)[0].map((el, i) => e(
            PopulateTable,
            { lab: color_data.lab[i], lch: color_data.lch[i], key: i, patch_id: i+1 },
            null,
        )),
        document.querySelector('#tab-difference tbody'),
    );
});
