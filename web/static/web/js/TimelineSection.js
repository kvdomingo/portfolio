var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimelineSection = function (_React$Component) {
    _inherits(TimelineSection, _React$Component);

    function TimelineSection(props) {
        _classCallCheck(this, TimelineSection);

        return _possibleConstructorReturn(this, (TimelineSection.__proto__ || Object.getPrototypeOf(TimelineSection)).call(this, props));
    }

    _createClass(TimelineSection, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    'h1',
                    { className: 'h2-responsive py-4' },
                    React.createElement('i', { className: this.props.icon + ' mr-3' }),
                    this.props.sectionName
                ),
                React.createElement(
                    'div',
                    { className: 'container px-md-5' },
                    React.createElement(
                        'ul',
                        { className: 'timeline' },
                        this.props.elements.map(function (el, i) {
                            return React.createElement(TimelineElements, Object.assign({}, el, { key: i }));
                        })
                    )
                )
            );
        }
    }]);

    return TimelineSection;
}(React.Component);