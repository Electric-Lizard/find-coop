import dataProvider from '../../data-provider';
import {App, getApp} from '../App';

import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

const deleteRoomMutation = mutationWithClientMutationId({
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
      type: App,
      resolve: getApp,
    },
  },
  mutateAndGetPayload: ({id}) => {
    const {id: roomId} = fromGlobalId(id);
    if (!dataProvider.getStore('Room').deleteUnique(roomId))
      id = false;
    return {id};
  }
});

export default deleteRoomMutation;
