var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimelineElements = function (_React$Component) {
    _inherits(TimelineElements, _React$Component);

    function TimelineElements(props) {
        _classCallCheck(this, TimelineElements);

        return _possibleConstructorReturn(this, (TimelineElements.__proto__ || Object.getPrototypeOf(TimelineElements)).call(this, props));
    }

    _createClass(TimelineElements, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                null,
                React.createElement(
                    'h4',
                    { className: 'h4-responsive mb-0 d-md-inline' },
                    this.props.title
                ),
                React.createElement(
                    'div',
                    { className: 'timeline-date text-muted float-md-right my-md-0 my-2' },
                    React.createElement('i', { className: 'far fa-clock mr-1' }),
                    this.props.startDate === '' ? '' + this.props.endDate : this.props.startDate + ' \u2013 ' + this.props.endDate
                ),
                React.createElement(
                    'p',
                    { className: 'lead my-0' },
                    this.props.connection.map(function (conn, i) {
                        if (i === 0) {
                            return React.createElement(
                                React.Fragment,
                                { key: i },
                                React.createElement(
                                    'a',
                                    { href: conn.href, target: '_blank' },
                                    conn.name,
                                    ' '
                                )
                            );
                        } else {
                            return React.createElement(
                                React.Fragment,
                                { key: i },
                                '| ',
                                React.createElement(
                                    'a',
                                    { href: conn.href, target: '_blank' },
                                    conn.name
                                )
                            );
                        }
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'mt-2 mb-5' },
                    this.props.description.map(function (desc, i) {
                        return React.createElement(
                            React.Fragment,
                            { key: i },
                            React.createElement(
                                'p',
                                { className: 'my-0' },
                                desc
                            )
                        );
                    }),
                    this.props.related ? React.createElement(
                        'a',
                        { href: this.props.related, className: 'btn btn-sm btn-outline-black ml-0 mt-3' },
                        'See in portfolio'
                    ) : null
                )
            );
        }
    }]);

    return TimelineElements;
}(React.Component);