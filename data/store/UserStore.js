import {CollectionItem, CollectionStoreProto} from './CollectionStore';


class User extends CollectionItem {
  static fields = Object.assign({}, CollectionItem.fields, {
    username: {},
    password: {},
  });
}
class UserStoreProto extends CollectionStoreProto {
  static modelProto = User;
}

let UserStore = new UserStoreProto();
export {User, UserStore, UserStoreProto};
