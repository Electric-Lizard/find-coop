import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {globalIdField} from 'graphql-relay';
import NodeInterface from '../NodeInterface';


const User = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
  interfaces: [NodeInterface],
});

export default User;
