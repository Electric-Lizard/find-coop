import queries from './queries';
import App from './components/App';
import RoomList from './components/RoomList';
import UserList from './components/UserList';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

import React from 'react';
import {Route, Redirect} from 'react-router';

const renderLoading = () => {
  return <div className="ui active loader"></div>;
};
const routes = (
    <Route
      path="/"
      component={App}
      renderLoading={renderLoading}
      queries={{
        app: queries.app
      }}
    >
      <Route
        path="rooms"
        component={RoomList}
        queries={{
          app: queries.app
        }}
        renderLoading={renderLoading}
      />
      <Route
        path="users"
        component={UserList}
        queries={{
          app: queries.app
        }}
        renderLoading={renderLoading}
      />
      <Route
        path="register"
        component={RegistrationForm}
        queries={{
          app: queries.app
        }}
      />
      <Route
        path="login"
        component={LoginForm}
        queries={{
          app: queries.app
        }}
      />
      <Redirect from="." to="/" />
    </Route>
  );
export default routes;
