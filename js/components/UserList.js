import React from 'react';
import Relay from 'react-relay';
import UserItem from './UserItem';

class UserList extends React.Component {
  render() {
    let users = this.props.app.users.edges.map(e => e.node);
    let {app} = this.props;
    return (
      <div>
        <h1>Game list</h1>
        <div className="ui relaxed divided list selection">
          {users.map(user =>
              <UserItem user={user} key={user.id} app={app}/>
          )}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(UserList, {
  initialVariables: {
    count: 10
  },
  fragments: {
    app: () => Relay.QL`
      fragments on App {
        users(first: $count) {
          edges {
            node {
              id,
              ${UserItem.getFragment('user')},
            }
          }
        },
      }
    `,
  },
});
