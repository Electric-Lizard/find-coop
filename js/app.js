import 'babel/polyfill';

import routes from './routes';
import {createHashHistory} from 'history';
import createHistory from 'history/lib/createBrowserHistory';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {RelayRouter} from 'react-router-relay';

let supports_history_api = function () {
  return !!(window.history && window.history.pushState);
};

const history = supports_history_api() ?
  createHistory() :
  createHashHistory({queryKey: false});

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('graphql', {
    credentials: 'same-origin',
  })
);
ReactDOM.render(
    <RelayRouter
      history={history}
      routes={routes}
    />,
  document.getElementById('root')
);
