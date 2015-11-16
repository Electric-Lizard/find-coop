import React from 'react';
import Relay from 'react-relay';
import RoomItem from './RoomItem';

class RoomList extends React.Component {
  render() {
    let rooms = this.props.app.rooms.edges.map(e => e.node);
    let {app} = this.props;
    return (
      <div>
        <h1>Game list</h1>
        <div className="ui relaxed divided list selection">
          {rooms.map(room =>
              <RoomItem room={room} key={room.id} app={app}/>
          )}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(RoomList, {
  initialVariables: {
    count: 10
  },
  fragments: {
    app: () => Relay.QL`
      fragments on App {
        rooms(first: $count) {
          edges {
            node {
              id,
              ${RoomItem.getFragment('room')},
            }
          }
        },
        ${RoomItem.getFragment('app')},
      }
    `,
  },
});
