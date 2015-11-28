import Util from './Util';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  //fromGlobalId,
  //nodeDefinitions,
  cursorForObjectInConnection,
} from 'graphql-relay';


class Lib {
  static requiredProps = ['dataSource'];
  getDefaultProps() {
    return {};
  }
  constructor(props) {
    this.stores = {};
    this.itemTypeMap = new Map();//item constructor => graphQL type name
    this.graphQLTypeMap = new Map();//graphQL type name => store
    this._connectionDefinitions = {};

    Util.checkRequired(props, ...this.constructor.requiredProps);
    Object.assign(this.props = {}, this.getDefaultProps(), props);
  }

  /**
   * @param {string} name
   * @param {CollectionStore} storeType
   * @return this
   */
  addStore(storeType) {
    const name = storeType.itemType.graphQLType.name;
    const {dataSource, nodeInterface} = this.props;
    const store = new storeType({dataSource, name, nodeInterface});
    this.stores[name] = store;
    this.itemTypeMap.set(store._itemType, name);
    this.graphQLTypeMap.set(name, store);
    return this;
  }

  //~ Interaction with GraphQL=================================================

  /**
   * Resolves GraphQL type to its data store
   */
  getStore(typeName) {
    return this.graphQLTypeMap.get(typeName) || null;
  }

  resolveItem(item) {
    return this.itemTypeMap.get(item.constructor) || null;
  }

  connection(typeName) {
    const store = this.getStore(typeName);
    return {
      type: this.getConnectionDefinition(typeName).connectionType,
      args: connectionArgs,
      resolve: (_, args) => {
        return connectionFromArray(store.getAll(), args);
      }
    };
  }

  edge(typeName) {
    return {
      type: this.getConnectionDefinition(typeName).edgeType,
      resolve: ({id=null}) => id === null ? null : this.cursor(typeName, id),
    };
  }

  cursor(typeName, nodeId) {
    const store = this.getStore(typeName);
    const node = store.getItem(nodeId);
    return {
      cursor: cursorForObjectInConnection(store.getAll(), node),
      node,
    };
  }

  getConnectionDefinition(name) {
    let type = this._connectionDefinitions[name];
    if (type === undefined) {
      const store = this.getStore(name);
      type = this._makeConnectionDefinition(store._itemType().graphQLType);
      this._connectionDefinitions[name] = type;
    }
    return type;
  }
  _makeConnectionDefinition(nodeType) {
    return connectionDefinitions({
      name: nodeType.name,
      nodeType,
    });
  }
}

export default Lib;
