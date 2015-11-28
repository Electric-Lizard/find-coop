import {CollectionItem, CollectionStore} from 'graphql-store';
import GraphQLRoomType from '../schema/types/Room';

class Room extends CollectionItem {
  static graphQLType = GraphQLRoomType;
}
class RoomStore extends CollectionStore {
  static itemType = Room;

  constructor(props) {
    super(props);
    this.createItem({title: 'Find coop', game: 'minecraft'});
    this.createItem({
      title: 'no one wants to play with me',
      game: 'dwarf fortress'
    });
    this.createItem({
      title: 'Pretty game',
      game: 'dota 2',
    });
  }
}

export {Room, RoomStore};
