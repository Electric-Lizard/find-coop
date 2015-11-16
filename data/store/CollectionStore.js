
class CollectionItem {
  static uniqueKey = 'id';
  static fields = {
    id: {
      required: true,
    }
  }

  constructor(fields) {
    this.constructor.fields.map((field, fieldName) => {
      if(fields[fieldName] !== undefined) {
        return fields.fieldName;
      } else if(!field.required) {
        return field.defaultValue();
      } else {
        throw `Missing required field "${fieldName}"`;
      }
    });
  }
}
class CollectionStore {
  static itemType = CollectionItem;
  constructor() {
    this._items = this.fetchData();

  }

  fetchData() {
    return this._items || [];
  }

  getItem(uniq) {
    return this._items.find(i => i[CollectionItem.uniqueKey] === uniq);
  }
}

export {CollectionStore, CollectionItem};
