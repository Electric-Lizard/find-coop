import Relay from 'react-relay';

class DeleteRoomMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {deleteRoom}`;
  }

  getVariables() {
    return {id: this.props.room.id};
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteRoomPayload {
        app {
          rooms,
        },
        deletedId,
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'app',
      parentID: this.props.app.id,
      connectionName: 'rooms',
      deletedIDFieldName: 'deletedId',
    }];
  }

  static fragments = {
    room: () => Relay.QL`
      fragment on Room {
        id,
      }
    `,
    app: () => Relay.QL`
      fragment on App {
        id
      }
    `,
  }
}

export default DeleteRoomMutation;
