import React from 'react';
import {Route} from 'react-router';
import queries from './queries';
import App from './components/App';
import RoomList from './components/RoomList';
import UserInfo from './components/UserInfo';

let routes = (
    <Route
      path="/"
      component={App}
      queries={{
        viewer: queries.viewer
      }}
    >
    <Route
      path="rooms"
      component={RoomList}
      queries={{
        app: queries.app
      }}
    />
    <Route
      path="you"
      component={UserInfo}
      queries={{
        viewer: queries.viewer
      }}
    />
    </Route>
  );
export default routes;
