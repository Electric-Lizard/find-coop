import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
import {fromGlobalId, nodeDefinitions} from 'graphql-relay';

import dataProvider from './data-provider';
import NodeInterface from './schema/NodeInterface';
import {appDefinition} from './schema/App';
import DeleteRoomMutation from './schema/mutations/DeleteRoom';
import RegisterMutation from './schema/mutations/Register';
import LoginMutation from './schema/mutations/Login';
import LogoutMutation from './schema/mutations/Logout';

const {nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    return dataProvider.getStore(type).getItem(id);
  }
);
nodeField.type = NodeInterface;
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    app: appDefinition,
  }),
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    deleteRoom: DeleteRoomMutation,
    register: RegisterMutation,
    login: LoginMutation,
    logout: LogoutMutation,
  }),
});

export const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
