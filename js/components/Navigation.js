import {Link} from 'react-router';
import LogoutMutation from '../mutations/LogoutMutation';

import React from 'react';
import Relay from 'react-relay';

class Navigation extends React.Component {
  render() {
    const {app} = this.props;

    //Main menu
    const mainMenu = [
      {to: 'users', text: 'User list'},
      {to: 'rooms', text: 'Room list'},
    ];

    //Secondary menu
    const secondaryMenu = [];
    if (!app.viewerAuthorized) {
      secondaryMenu.push({to: 'register', text: 'Sign Up'});
      secondaryMenu.push({to: 'login', text: 'Sign In'});
    } else {
      secondaryMenu.push({
        to: 'logout',
        text: 'Logout',
        noHref: true,
        props: {onClick: this._logout.bind(this)},
      });
    }

    const drawItem = (item) => {
      const Tag = item.noHref ? 'a' : Link;
      const to = !item.noHref ? {to: item.to} : {to: ''};
      item.props = item.props || {};
      const props = {
        ...to,
        ...item.props,
        className: 'item',
        key: item.to,
      };

      if (this.props.history.isActive(props.to)) {
        props.className += ' active';
      }

      return <Tag {...props}>{item.text}</Tag>;
    };
    return (
      <div className="ui menu">
        {mainMenu.map(drawItem)}
        <div className="right menu">
          {secondaryMenu.map(drawItem)}
        </div>
      </div>
    );
  }

  _logout() {
    const {app} = this.props;
    Relay.Store.update(new LogoutMutation({app}));
  }
}

export default Relay.createContainer(Navigation, {
  fragments: {
    app: () => Relay.QL`
      fragment on App {
        viewerAuthorized,
        ${LogoutMutation.getFragment('app')},
      }
    `
  },
});

