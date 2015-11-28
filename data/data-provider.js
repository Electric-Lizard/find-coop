import {UserStore} from './store/UserStore';
import {RoomStore} from './store/RoomStore';
import {GraphQLStore} from 'graphql-store';
import dataSource from './data-source';


const dataProvider = new GraphQLStore({
  dataSource,
})
  .addStore(UserStore)
  .addStore(RoomStore);
export default dataProvider;
