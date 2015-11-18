import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class UserInfo extends React.Component {
  render() {
    return (
        <Link to={`/rooms`}>
        You are nice
        </Link>
        );
  }
}

export default Relay.createContainer(UserInfo, {
  fragments: {

  }
});
