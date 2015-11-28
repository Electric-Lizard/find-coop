import dataProvider from '../../data-provider';
import {appDefinition} from '../App';
import Status from '../types/Status';

import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import {
  mutationWithClientMutationId,
} from 'graphql-relay';


const RegisterMutation = mutationWithClientMutationId({
  name: 'Register',
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    confirmPassword: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    userEdge: dataProvider.edge('User'),
    app: appDefinition,
    status: {
      type: Status,
      resolve: ({status}) => status,
    },
    errors: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      resolve: ({errors}) => errors,
    },
  },

  mutateAndGetPayload: ({username, password, confirmPassword},
                        {rootValue: {session}}) => {
    const errors = [];
    let id = null;
    let status = 'ERROR';
    const user = dataProvider.getStore('User').find((user) =>
      user.username === username
    );
    if (user) errors.push(`Username "${user.username}" is already taken`);
    if (password !== confirmPassword)
      errors.push(`Password and confirm password fields is not identical`);

    if (errors.length <= 0) {
      id = dataProvider.getStore('User').createItem({username, password});
      session.viewerId = id;
      status = 'SUCCESS';
    }
    return {status, errors, id};
  },
});

export default RegisterMutation;
