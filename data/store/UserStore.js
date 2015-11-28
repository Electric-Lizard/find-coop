import {CollectionItem, CollectionStore} from 'graphql-store';
import GraphQLUserType from '../schema/types/User';


class User extends CollectionItem {
  static graphQLType = GraphQLUserType;
}
class UserStore extends CollectionStore {
  static itemType = User;

  constructor(props) {
    super(props);
    this.createItem({
      username: 'admin',
      password: 'admin',
    });
  }
}

export {User, UserStore};
