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

import {
  // Import methods that your schema can use to interact with your database
  User,
  Room,
  getUser,
  getViewer,
  getRoom,
  getRooms,
  removeRoom,
} from './store/store';
const app = {id: 1};
let getApp = () => (app);

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Room') {
      return getRoom(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof Room)  {
      return roomType;
    } else {
      return null;
    }
  }
);

//~ Data types ================================================================

var userType = new GraphQLObjectType({
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
      resolve: (_, args) => connectionFromArray(getRooms(), args),
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
    const {id: todoId} = fromGlobalId(id);
    removeRoom(todoId);
    return {id};
  }
});

//~ Root structure ============================================================

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: userType,
      resolve: () => getViewer(),
    },
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
