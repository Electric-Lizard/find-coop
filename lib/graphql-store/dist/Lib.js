'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _graphqlRelay = require('graphql-relay');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lib = (function () {
  _createClass(Lib, [{
    key: 'getDefaultProps',
    value: function getDefaultProps() {
      return {};
    }
  }]);

  function Lib(props) {
    _classCallCheck(this, Lib);

    this.stores = {};
    this.itemTypeMap = new Map(); //item constructor => graphQL type name
    this.graphQLTypeMap = new Map(); //graphQL type name => store
    this._connectionDefinitions = {};

    _Util2.default.checkRequired.apply(_Util2.default, [props].concat(_toConsumableArray(this.constructor.requiredProps)));
    Object.assign(this.props = {}, this.getDefaultProps(), props);
  }

  /**
   * @param {string} name
   * @param {CollectionStore} storeType
   * @return this
   */

  _createClass(Lib, [{
    key: 'addStore',
    value: function addStore(storeType) {
      var name = storeType.itemType.graphQLType.name;
      var _props = this.props;
      var dataSource = _props.dataSource;
      var nodeInterface = _props.nodeInterface;

      var store = new storeType({ dataSource: dataSource, name: name, nodeInterface: nodeInterface });
      this.stores[name] = store;
      this.itemTypeMap.set(store._itemType, name);
      this.graphQLTypeMap.set(name, store);
      return this;
    }

    //~ Interaction with GraphQL=================================================

    /**
     * Resolves GraphQL type to its data store
     */

  }, {
    key: 'getStore',
    value: function getStore(typeName) {
      return this.graphQLTypeMap.get(typeName) || null;
    }
  }, {
    key: 'resolveItem',
    value: function resolveItem(item) {
      return this.itemTypeMap.get(item.constructor) || null;
    }
  }, {
    key: 'connection',
    value: function connection(typeName) {
      var store = this.getStore(typeName);
      return {
        type: this.getConnectionDefinition(typeName).connectionType,
        args: _graphqlRelay.connectionArgs,
        resolve: function resolve(_, args) {
          return (0, _graphqlRelay.connectionFromArray)(store.getAll(), args);
        }
      };
    }
  }, {
    key: 'edge',
    value: function edge(typeName) {
      var _this = this;

      return {
        type: this.getConnectionDefinition(typeName).edgeType,
        resolve: function resolve(_ref) {
          var id = _ref.id;
          return id === null ? null : _this.cursor(typeName, id);
        }
      };
    }
  }, {
    key: 'cursor',
    value: function cursor(typeName, nodeId) {
      var store = this.getStore(typeName);
      var node = store.getItem(nodeId);
      return {
        cursor: (0, _graphqlRelay.cursorForObjectInConnection)(store.getAll(), node),
        node: node
      };
    }
  }, {
    key: 'getConnectionDefinition',
    value: function getConnectionDefinition(name) {
      var type = this._connectionDefinitions[name];
      if (type === undefined) {
        var store = this.getStore(name);
        type = this._makeConnectionDefinition(store._itemType().graphQLType);
        this._connectionDefinitions[name] = type;
      }
      return type;
    }
  }, {
    key: '_makeConnectionDefinition',
    value: function _makeConnectionDefinition(nodeType) {
      return (0, _graphqlRelay.connectionDefinitions)({
        name: nodeType.name,
        nodeType: nodeType
      });
    }
  }]);

  return Lib;
})();

Lib.requiredProps = ['dataSource'];
exports.default = Lib;