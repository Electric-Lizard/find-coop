import {GraphQLEnumType} from 'graphql';


const Status = new GraphQLEnumType({
  name: 'Status',
  values: {
    SUCCESS: {},
    ERROR: {},
  }
});

export default Status;
