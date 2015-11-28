"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataSource = (function () {
  function DataSource() {
    _classCallCheck(this, DataSource);

    this.storeNameMap = new Map();
  }

  _createClass(DataSource, [{
    key: "getItems",
    value: function getItems(storeName) {
      throw "Method DataSource#getItems should be overriden " + ("to resolve data source for type \"" + storeName + "\"");
    }
  }, {
    key: "setStore",
    value: function setStore(storeName, store) {
      this.storeNameMap.set(store, storeName);
    }
  }, {
    key: "fetchStoreData",
    value: function fetchStoreData(store) {
      return this.getItems(this.storeNameMap.get(store));
    }
  }]);

  return DataSource;
})();

exports.default = DataSource;