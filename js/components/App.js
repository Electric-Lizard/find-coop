import Navigation from './Navigation';

import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    const {children, app, history} = this.props;
    return (
      <div>
        <h1>Title here</h1>
        <Navigation {...{app, history}} />
        <div>
          {children}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    app: () => Relay.QL`
      fragment on App {
        ${Navigation.getFragment('app')},
      }
    `
  },
});
