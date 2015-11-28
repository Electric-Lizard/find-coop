import {DataSource} from 'graphql-store';


const database = new Map();
const fetchData = (storeName) => {
  const data = new Map();
  return data;
};

class DataSourceImpl extends DataSource {
  getItems(storeName) {
    let items = database.get(storeName);
    if (items === undefined) {
      items = fetchData(storeName);
      database.set(storeName, items);
    }
    return items;
  }
}
const dataSource = new DataSourceImpl();
export default dataSource;
