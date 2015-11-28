import Util from './Util';
import {EventEmitter} from 'events';
import util from 'util';


//~ Structure==================================================================
class CollectionItem {
  //FIXME: i think it's hardcoded in graphql, so can't be overriden
  static uniqueKey = 'id';
  static graphQLType = null;

  constructor(props) {
    this.validateProps(props) && Object.assign(this, props);
  }

  validateProps(props) {
    if (!props) {
      throw 'Properties are not defined';
    }
    if (!('id' in props))
      throw `"id" property was not supplied`;
    return true;
  }

  _uniqueKey() {
    return this.constructor.uniqueKey;
  }
}

class CollectionStore {
  static itemType = CollectionItem;

  constructor(props) {
    Util.checkRequired(props, ...['dataSource', 'name']);
    Object.assign(this.props = {}, props);

    var {dataSource, name} = this.props;
    dataSource.setStore(name);
    this._items = new Map();
    this.fetchData();
  }

  generateUniqueKey() {
    const keys = Array.from(this._items.keys());
    if (keys.length <= 0) return 1+'';
    keys.sort();
    const lastKey = keys.pop();
    if (!isFinite(lastKey)) {
      throw 'Failed to generate unique key, ' +
        'store contains non-number keys. ' +
        'Override "generateUniqueKey" method in store ' +
        'to handle non-number keys';
    }

    return (parseInt(lastKey)+1) + '';
  }

  getItem(uniq) {
    return this._items.get(uniq);
  }

  find(callback) {
    for (let value of this._items.values()) {
      if (callback(value)) return value;
    }
    return null;
  }

  filter(callback) {
    const passedValues = [];
    for (let value of this._items.values()) {
      if (callback(value)) passedValues.push(value);
    }
    return passedValues;
  }

  createItem(itemProps) {
    const uniq = this.generateUniqueKey();
    const itemType = this._itemType();
    itemProps[itemType.uniqueKey] = uniq;
    const item = new itemType(itemProps);

    this.saveItem(item);
    return uniq;
  }

  saveItem(item) {
    return this._validateItemType(item) &&
      this._items.set(item[this._itemType().uniqueKey], item);
  }

  deleteItem(item) {
    return this._validateItemType(item) &&
      this._items.delete(item[this._itemType().uniqueKey]);
  }

  deleteUnique(uniq) {
    return this._items.delete(uniq);
  }

  count() {
    return this._items.size;
  }

  getAll() {
    return Array.from(this._items.values());
  }

  fetchData() {
    //TODO: async call, return promise, emit event
    return new Promise((fulfill, reject) => {
      this._items = this.dataSource.fetchStoreData(this);
      this.emit('dataFetched');
      fulfill();
    });
  }

  _validateItemType(item) {
    if (!(item instanceof this._itemType())) {
      throw 'Type violation. Incompatible type for this store';
    }

    return true;
  }

  _itemType() {
    return this.constructor.itemType;
  }
}
util.inherits(CollectionStore, EventEmitter);

export {CollectionItem, CollectionStore};
