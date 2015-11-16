import React from 'react';
import Relay from 'react-relay';
import UserInfo from './UserInfo';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    const {children, viewer} = this.props;
    return (
      <div>
        <h1>Widget list</h1>
        <h2>
          <Link to={'you'}>User info</Link>
          |
          <Link to={'rooms'}>Room list</Link>
        </h2>
        <div>
          {children}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${UserInfo.getFragment('viewer')},
      }
    `,
  },
});
