class DataSource {
  constructor() {
    this.storeNameMap = new Map();
  }

  getItems(storeName) {
    throw `Method DataSource#getItems should be overriden ` +
      `to resolve data source for type "${storeName}"`;
  }

  setStore(storeName, store) {
    this.storeNameMap.set(store, storeName);
  }

  fetchStoreData(store) {
    return this.getItems(this.storeNameMap.get(store));
  }
}
export default DataSource;
