import {nodeDefinitions} from 'graphql-relay';


const resolveItem = (item) => item.constructor.graphQLType.name;
const {nodeInterface} = nodeDefinitions(null, resolveItem);

export default nodeInterface;
