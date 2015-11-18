/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import stores from './stores';
const app = {id: 1};
const getApp = () => (app);

//~ Resolving =================================================================

/**
 * Map associates GraphQL type with data store
 */
const typeStoreMap = {
  'User': stores.user,
  'Room': stores.room,
};

/**
 * Resolves GraphQL type to its data store
 */
const resolveType = (type) => typeStoreMap[type] || null;

const storeGraphQLTypeMap = new Map();
Object.keys(typeStoreMap).forEach((gType) => {
  storeGraphQLTypeMap.set(resolveType(gType)._itemType(), gType);
});

/**
 * Resolves object to its GraphQL type
 */
const resolveObject = obj => storeGraphQLTypeMap.get(obj.constructor) || null;

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    return resolveType(type).getItem(id);
  },
  (obj) => resolveObject(obj)
);

//~ Data types ================================================================

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
  }),
  interfaces: [nodeInterface],
});

let roomType = new GraphQLObjectType({
  name: 'Room',
  description: 'room for lobby',
  fields: () => ({
    id: globalIdField('Room'),
    title: {
      type: GraphQLString,
    },
    game: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface]
});

var appType = new GraphQLObjectType({
  name: 'App',
  description: 'Main data provider, a la "root" (under another root)',
  fields:() => ({
    id: globalIdField('App'),
    rooms: {
      type: roomConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(stores.room.getAll(), args),
    }
  }),
  interfaces: [nodeInterface],
});

//~ Connections ===============================================================
//
var {connectionType: roomConnection} =
  connectionDefinitions({name: 'Room', nodeType: roomType});

//~ Mutations =================================================================

var deleteRoomMutation = mutationWithClientMutationId({
  name: 'DeleteRoom',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    deletedId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({id}) => id,
    },
    app: {
      type: appType,
      resolve: getApp,
    },
  },
  mutateAndGetPayload: ({id}) => {
    const {id: roomId} = fromGlobalId(id);
    if (!stores.room.deleteUnique(roomId)) id = false;
    return {id};
  }
});

//~ Root structure ============================================================

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    app: {
      type: appType,
      args: connectionArgs,
      resolve:() => getApp(),
    },
  }),
});

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    deleteRoom: deleteRoomMutation,
  })
});

export var Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
