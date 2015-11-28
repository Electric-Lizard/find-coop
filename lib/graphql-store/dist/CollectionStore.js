'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionStore = exports.CollectionItem = undefined;

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _events = require('events');

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//~ Structure==================================================================

var CollectionItem = (function () {
  //FIXME: i think it's hardcoded in graphql, so can't be overriden

  function CollectionItem(props) {
    _classCallCheck(this, CollectionItem);

    this.validateProps(props) && Object.assign(this, props);
  }

  _createClass(CollectionItem, [{
    key: 'validateProps',
    value: function validateProps(props) {
      if (!props) {
        throw 'Properties are not defined';
      }
      if (!('id' in props)) throw '"id" property was not supplied';
      return true;
    }
  }, {
    key: '_uniqueKey',
    value: function _uniqueKey() {
      return this.constructor.uniqueKey;
    }
  }]);

  return CollectionItem;
})();

CollectionItem.uniqueKey = 'id';
CollectionItem.graphQLType = null;

var CollectionStore = (function () {
  function CollectionStore(props) {
    _classCallCheck(this, CollectionStore);

    _Util2.default.checkRequired.apply(_Util2.default, [props].concat(['dataSource', 'name']));
    Object.assign(this.props = {}, props);

    var _props = this.props;
    var dataSource = _props.dataSource;
    var name = _props.name;

    dataSource.setStore(name);
    this._items = new Map();
    this.fetchData();
  }

  _createClass(CollectionStore, [{
    key: 'generateUniqueKey',
    value: function generateUniqueKey() {
      var keys = Array.from(this._items.keys());
      if (keys.length <= 0) return 1 + '';
      keys.sort();
      var lastKey = keys.pop();
      if (!isFinite(lastKey)) {
        throw 'Failed to generate unique key, ' + 'store contains non-number keys. ' + 'Override "generateUniqueKey" method in store ' + 'to handle non-number keys';
      }

      return parseInt(lastKey) + 1 + '';
    }
  }, {
    key: 'getItem',
    value: function getItem(uniq) {
      return this._items.get(uniq);
    }
  }, {
    key: 'find',
    value: function find(callback) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._items.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          if (callback(value)) return value;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: 'filter',
    value: function filter(callback) {
      var passedValues = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._items.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var value = _step2.value;

          if (callback(value)) passedValues.push(value);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return passedValues;
    }
  }, {
    key: 'createItem',
    value: function createItem(itemProps) {
      var uniq = this.generateUniqueKey();
      var itemType = this._itemType();
      itemProps[itemType.uniqueKey] = uniq;
      var item = new itemType(itemProps);

      this.saveItem(item);
      return uniq;
    }
  }, {
    key: 'saveItem',
    value: function saveItem(item) {
      return this._validateItemType(item) && this._items.set(item[this._itemType().uniqueKey], item);
    }
  }, {
    key: 'deleteItem',
    value: function deleteItem(item) {
      return this._validateItemType(item) && this._items.delete(item[this._itemType().uniqueKey]);
    }
  }, {
    key: 'deleteUnique',
    value: function deleteUnique(uniq) {
      return this._items.delete(uniq);
    }
  }, {
    key: 'count',
    value: function count() {
      return this._items.size;
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      return Array.from(this._items.values());
    }
  }, {
    key: 'fetchData',
    value: function fetchData() {
      var _this = this;

      //TODO: async call, return promise, emit event
      return new Promise(function (fulfill, reject) {
        _this._items = _this.dataSource.fetchStoreData(_this);
        _this.emit('dataFetched');
        fulfill();
      });
    }
  }, {
    key: '_validateItemType',
    value: function _validateItemType(item) {
      if (!(item instanceof this._itemType())) {
        throw 'Type violation. Incompatible type for this store';
      }

      return true;
    }
  }, {
    key: '_itemType',
    value: function _itemType() {
      return this.constructor.itemType;
    }
  }]);

  return CollectionStore;
})();

CollectionStore.itemType = CollectionItem;

_util2.default.inherits(CollectionStore, _events.EventEmitter);

exports.CollectionItem = CollectionItem;
exports.CollectionStore = CollectionStore;