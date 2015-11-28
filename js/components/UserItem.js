import React from 'react';
import Relay from 'react-relay';

class UserItem extends React.Component {
  render() {
    const {user} = this.props;
    return (
      <div className="item ui grid">
        <div className="two column row">
          <div className="column">
            {user.username}
          </div>
          <div className="column right aligned">
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(UserItem, {
  fragments: {
    /*app: () => Relay.QL`
      fragment on App {

      }
      `,*/
    user: () => Relay.QL`
      fragment on User {
        username,
      }
    `,
  },
});
