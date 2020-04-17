var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var educationInfo = [{
    key: 'upd',
    university: 'University of the Philippines',
    startDate: 'Aug 2015',
    endDate: 'Jun 2020 (exp.)',
    institute: 'National Institute of Physics',
    course: ['B.S. Applied Physics (Major in Instrumentation)']
}, {
    key: 'cs50',
    university: 'Harvard University',
    startDate: 'Dec 2019',
    endDate: 'Apr 2020',
    institute: 'Division of Continuing Education',
    course: ['CS50W: Web Programming with Python and JavaScript', 'CS50M: Mobile App Development with React Native']
}];

var EducationTimeline = function (_React$Component) {
    _inherits(EducationTimeline, _React$Component);

    function EducationTimeline(props) {
        _classCallCheck(this, EducationTimeline);

        return _possibleConstructorReturn(this, (EducationTimeline.__proto__ || Object.getPrototypeOf(EducationTimeline)).call(this, props));
    }

    _createClass(EducationTimeline, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                null,
                React.createElement(
                    'h4',
                    { className: 'h4-responsive mb-0 d-md-inline' },
                    this.props.university
                ),
                React.createElement(
                    'div',
                    { className: 'timeline-date text-muted float-md-right my-md-0 my-2' },
                    React.createElement('i', { className: 'far fa-clock mr-1' }),
                    this.props.startDate + ' - ' + this.props.endDate
                ),
                React.createElement(
                    'p',
                    { className: 'lead my-0' },
                    this.props.institute
                ),
                this.props.course.map(function (c) {
                    return React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(
                            'p',
                            { className: 'text-muted my-0' },
                            c
                        )
                    );
                })
            );
        }
    }]);

    return EducationTimeline;
}(React.Component);