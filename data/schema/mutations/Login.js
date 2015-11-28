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


const LoginMutation = mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
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

  mutateAndGetPayload: ({username, password}, {rootValue: {session}}) => {
    const errors = [];
    let status = 'ERROR';
    const user = dataProvider.getStore('User').find((user) =>
      user.username === username &&
      user.password === password
    );

    if (!user) {
      errors.push('Incorrect username or password');
    } else {
      session.viewerId = user.id;
      status = 'SUCCESS';
    }

    return {errors, status};
  },
});

export default LoginMutation;
