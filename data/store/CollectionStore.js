const database = new Map();
const fetchData = (type) => {
  const data = new Map();
  return data;
};
const getItems = (type) => {
  let items = database.get(type);
  if (items == undefined) {
    items = fetchData(type);
    database.set(type, items);
  }
  return items;
};

//~ Structure==================================================================
class CollectionItem {
  static uniqueKey = 'id';
  static fields = {
    id: {}
  }

  constructor(fields) {
    let processedFields =
      Object.keys(this.constructor.fields).map((fieldName) => {
        let fieldDesc = this.constructor.fields[fieldName];
        if(fields[fieldName] !== undefined) {
          return {[fieldName]: fields[fieldName]};
        } else if(fieldDesc.defaultValue) {
          return {[fieldName]: fieldDesc.defaultValue()};
        } else {
          throw `Missing required field "${fieldName}"`;
        }
      });
    Object.assign(this, ...processedFields);
  }

  _uniqueKey() {
    return this.constructor.uniqueKey;
  }
}

class CollectionStoreProto {
  static itemType = CollectionItem;

  constructor() {
    this._items = getItems(this.constructor.itemType);
  }

  getItem(uniq) {
    return this._items.get(uniq);
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

let CollectionStore = new CollectionStoreProto();
export {CollectionStore, CollectionItem, CollectionStoreProto};
