/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types
class User extends Object {}
class Widget extends Object {}
class Room {
  constructor({id, title, game}) {
    this.id = id;
    this.title = title,
    this.game = game;
  }
}

// Mock data
var viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';
var widgets = ['What\'s-it', 'Who\'s-it', 'How\'s-it'].map((name, i) => {
  var widget = new Widget();
  widget.name = name;
  widget.id = `${i}`;
  return widget;
});

var rooms = [
  {
    id: 0,
    title: 'Find coop',
    game: 'minecraft',
  },
  {
    id: 1,
    title: 'no one wants to play with me',
    game: 'dwarf fortress',
  },
  {
    id: 2,
    title: 'hey',
    game: 'dota 2',
  },
].map(room => new Room(room));
let getRoom = id => rooms.find(g => g.id === id);

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getWidget: (id) => widgets.find(w => w.id === id),
  getWidgets: () => widgets,
  User,
  Widget,
  Room,
  getRoom,
  getRooms: () => rooms,
  removeRoom: id => rooms.splice(rooms.indexOf(getRoom(id)), 1),
};
