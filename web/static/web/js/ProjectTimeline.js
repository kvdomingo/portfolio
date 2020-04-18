var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var projectInfo = [{
    key: 'proj-detectph',
    name: 'DetectPH',
    startDate: 'Mar 2020',
    endDate: 'present',
    site: 'https://detectph.com/',
    download: null,
    description: 'Volunteered as one of the designers of an Android/iOS app to perform contact tracing of COVID-19 cases in the Philippines, spearheaded by the UP Diliman College of Science.'
}, {
    key: 'covid19ph',
    name: 'COVID-19 PH Tracker Dashboard',
    startDate: 'Mar 2020',
    endDate: 'present',
    site: 'https://ncovenience.herokuapp.com/',
    download: null,
    description: 'Designed an information hub, dashboard, and API regarding COVID-19 data in the Philippines.'
}, {
    key: 'primerdriver',
    name: 'PrimerDriver',
    startDate: 'Jan 2020',
    endDate: 'Feb 2020',
    site: 'https://primerdriver.herokuapp.com/',
    download: 'https://github.com/kvdomingo/primerdriver/releases',
    description: 'A command-line tool and web application to design PCR primers for site-directed mutagenesis.'
}];

var ProjectTimeline = function (_React$Component) {
    _inherits(ProjectTimeline, _React$Component);

    function ProjectTimeline(props) {
        _classCallCheck(this, ProjectTimeline);

        return _possibleConstructorReturn(this, (ProjectTimeline.__proto__ || Object.getPrototypeOf(ProjectTimeline)).call(this, props));
    }

    _createClass(ProjectTimeline, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                { className: 'py-1' },
                React.createElement(
                    'h4',
                    { className: 'h4-responsive mb-0 d-md-inline' },
                    this.props.name
                ),
                React.createElement(
                    'div',
                    { className: 'timeline-date text-muted float-md-right my-md-0 my-2' },
                    React.createElement('i', { className: 'far fa-clock mr-1' }),
                    this.props.startDate + ' - ' + this.props.endDate
                ),
                React.createElement(
                    'p',
                    { className: 'lead my-0 pb-3' },
                    React.createElement(
                        'a',
                        { href: this.props.site, target: '_blank' },
                        'Project Website '
                    ),
                    this.props.download && React.createElement(
                        React.Fragment,
                        null,
                        '| ',
                        React.createElement(
                            'a',
                            { href: this.props.download, target: '_blank' },
                            'Download'
                        )
                    )
                ),
                React.createElement(
                    'p',
                    null,
                    this.props.description
                )
            );
        }
    }]);

    return ProjectTimeline;
}(React.Component);