var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var workInfo = [{
    key: 'detectph',
    position: 'Backend/Web Developer',
    startDate: 'Mar 2020',
    endDate: 'present',
    company: 'DetectPH',
    href: 'https://detectph.com/',
    description: 'Volunteer developer for a COVID-19 contact tracing app in the Philippines.'
}, {
    key: 'upiris-ec',
    position: 'Executive Officer for Promotions and Documentation',
    startDate: 'Jan 2020',
    endDate: 'present',
    company: 'UP Iris',
    href: 'https://facebook.com/upiris',
    description: 'Oversaw all organization matters regarding publicity and documentation of both internal and external events.'
}, {
    key: 'upiris',
    position: 'Photographer',
    startDate: 'May 2019',
    endDate: 'present',
    company: 'UP Iris',
    href: 'https://facebook.com/upiris',
    description: null
}, {
    key: 'ipl',
    position: 'Student Researcher',
    startDate: 'Oct 2017',
    endDate: 'present',
    company: 'Instrumentation Physics Laboratory',
    href: 'https://sites.google.com/site/instrumentationphysicslab/',
    description: 'Processing and analysis of videos, images, and other signals using classical signal processing methods, compressive sensing, and machine learning.'
}, {
    key: 'pgc',
    position: 'Intern',
    startDate: 'Jan 2020',
    endDate: 'Feb 2020',
    company: 'Philippine Genome Center',
    href: 'https://pgc.up.edu.ph/',
    description: 'Underwent training in bioinformatics; developed a command-line tool and web application for designing primers for site-directed mutagenesis.'
}, {
    key: 'trin',
    position: 'Intern',
    startDate: 'Jun 2019',
    endDate: 'Nov 2019',
    company: 'The Rest is Noise PH',
    href: 'https://therestisnoiseph.com/',
    description: 'Provided analytics to determine key points to target in order to maximize marketing; involved in project planning and on-site production for All of The Noise 2019 held at Century City Mall, City of Makati.'
}, {
    key: 'philcomars',
    position: 'Student Assistant',
    startDate: 'Dec 2018',
    endDate: 'Jan 2019',
    company: 'Philippine Coral Reef and Mangrove Remote Sensing Project',
    href: 'https://202.90.159.82/philcomars/',
    description: 'Performed ground-truth validation of images involving corals classified by a deep neural network. '
}];

var WorkTimeline = function (_React$Component) {
    _inherits(WorkTimeline, _React$Component);

    function WorkTimeline(props) {
        _classCallCheck(this, WorkTimeline);

        return _possibleConstructorReturn(this, (WorkTimeline.__proto__ || Object.getPrototypeOf(WorkTimeline)).call(this, props));
    }

    _createClass(WorkTimeline, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                { className: 'py-1' },
                React.createElement(
                    'h4',
                    { className: 'h4-responsive mb-0 d-md-inline' },
                    this.props.position
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
                        { href: this.props.href, target: '_blank' },
                        this.props.company
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

    return WorkTimeline;
}(React.Component);