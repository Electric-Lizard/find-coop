import {CollectionItem, CollectionStore} from './CollectionStore';


class User extends CollectionItem {
  static fields = Object.assign({}, CollectionItem, {
    username: {
      required: true
    },
    password: {
      required: true
    }
  });
}
class UserStore extends CollectionStore {
  static modelProto = User;
}

export {User, UserStore};
