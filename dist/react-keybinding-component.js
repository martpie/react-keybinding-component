'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeybindingComponent = (function (_Component) {
    _inherits(KeybindingComponent, _Component);

    function KeybindingComponent(props) {
        _classCallCheck(this, KeybindingComponent);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(KeybindingComponent).call(this, props));

        _this.state = {};
        _this.onKey = _this.onKey.bind(_this);
        return _this;
    }

    _createClass(KeybindingComponent, [{
        key: 'render',
        value: function render() {

            return false;
        }
    }, {
        key: 'onKey',
        value: function onKey(e) {
            if (!(this.props.preventInputConflict && (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea'))) this.props.onKey(e);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var self = this;
            this.props.elem.addEventListener(this.props.type, this.onKey);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var self = this;
            this.props.elem.removeEventListener(this.props.type, this.onKey);
        }
    }]);

    return KeybindingComponent;
})(_react.Component);

KeybindingComponent.defaultProps = {
    onKey: function onKey() {},
    type: 'keydown',
    target: document,
    preventInputConflict: false
};

KeybindingComponent.propTypes = {
    onKey: _react2.default.PropTypes.func,
    type: _react2.default.PropTypes.string,
    target: _react2.default.PropTypes.object,
    preventInputConflict: _react2.default.PropTypes.bool
};

exports.default = KeybindingComponent;