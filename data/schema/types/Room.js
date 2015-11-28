import {
  //GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {globalIdField} from 'graphql-relay';
import NodeInterface from '../NodeInterface';


const Room = new GraphQLObjectType({
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
  interfaces: [NodeInterface]
});

export default Room;
