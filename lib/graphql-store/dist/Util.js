'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = (function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: 'checkRequired',
    value: function checkRequired(obj) {
      for (var _len = arguments.length, requiredProps = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        requiredProps[_key - 1] = arguments[_key];
      }

      requiredProps.forEach(function (propName) {
        if (!(propName in obj)) throw 'Required property "' + propName + '" not supplied to constructor';
      });
    }
  }, {
    key: 'partialExtend',
    value: function partialExtend(dest, source) {
      for (var _len2 = arguments.length, keys = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        keys[_key2 - 2] = arguments[_key2];
      }

      return Object.assign(dest, _underscore2.default.pick.apply(_underscore2.default, [source].concat(keys)));
    }
  }]);

  return Util;
})();

exports.default = Util;