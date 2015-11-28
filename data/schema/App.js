import dataProvider from '../data-provider';
import NodeInterface from './NodeInterface';
import User from './types/User';

import {GraphQLObjectType, GraphQLBoolean, GraphQLNonNull} from 'graphql';
import {globalIdField} from 'graphql-relay';

const isViewerAuthorized = (session) => {
  return !!session.viewerId;
};
const App = new GraphQLObjectType({
  name: 'App',
  description: 'Main data provider, a la "root" (under another root)',
  fields:() => ({
    id: globalIdField('App'),
    rooms: dataProvider.connection('Room'),
    users: dataProvider.connection('User'),
    viewerAuthorized: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (_, __, {rootValue: {session}}) => isViewerAuthorized(session),
    },
    viewer: {
      type: User,
      resolve: (_, __, {rootValue: {session}}) => {
        session = session ? session : {};
        return isViewerAuthorized(session) ?
          dataProvider.getStore('User').getItem(session.userId) :
          null;
      }
    },
  }),
  interfaces: [NodeInterface],
});
const app = {id: 1};
const getApp = () => app;
const appDefinition = {
  type: App,
  resolve: getApp,
};

export {App, getApp, appDefinition};
