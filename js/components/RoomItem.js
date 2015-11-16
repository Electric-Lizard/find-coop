import React from 'react';
import Relay from 'react-relay';
import DeleteBtn from './DeleteBtn';
import DeleteRoomMutation from '../mutations/DeleteRoomMutation';

class RoomItem extends React.Component {
  render() {
    const {room} = this.props;
    const _deleteRoom = this._deleteRoom.bind(this);
    return (
      <div className="item ui grid">
        <div className="two column row">
          <div className="column">
            {room.title} ({room.game})
          </div>
          <div className="column right aligned">
            <DeleteBtn  onActivate={_deleteRoom}/>
          </div>
        </div>
      </div>
    );
  }
  _deleteRoom() {
    const {room, app} = this.props;
    Relay.Store.update(new DeleteRoomMutation({room, app}));
  }
}

export default Relay.createContainer(RoomItem, {
  fragments: {
    app: () => Relay.QL`
      fragment on App {
        ${DeleteRoomMutation.getFragment('app')},
      }
    `,
    room: () => Relay.QL`
      fragment on Room {
        title,
        game,
        ${DeleteRoomMutation.getFragment('room')},
      }
    `,
  },
});
