import {CollectionItem, CollectionStoreProto} from './CollectionStore';


class Room extends CollectionItem {
  static fields = Object.assign({}, CollectionItem.fields, {
    title: {},
    game: {},
  });
}
class RoomStoreProto extends CollectionStoreProto {
  static itemType = Room;

  constructor() {
    super();
    this.saveItem(new Room({id: '1', title: 'Find coop', game: 'minecraft'}));
    this.saveItem(new Room({
      id: '2',
      title: 'no one wants to play with me',
      game: 'dwarf fortress'
    }));
    this.saveItem(new Room({
      id: '3',
      title: 'Pretty game',
      game: 'dota 2',
    }));
  }
}

let RoomStore = new RoomStoreProto();
export {Room, RoomStore, RoomStoreProto};
