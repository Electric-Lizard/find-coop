import {appDefinition} from '../App';

import {
  mutationWithClientMutationId,
} from 'graphql-relay';


const LogoutMutation = mutationWithClientMutationId({
  name: 'Logout',
  inputFields: {

  },
  outputFields: {
    app: appDefinition,
  },

  mutateAndGetPayload: (_, {rootValue: {session}}) => {
    session.viewerId = undefined;
    return {};
  },
});

export default LogoutMutation;
