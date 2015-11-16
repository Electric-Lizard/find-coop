import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {RelayRouter} from 'react-router-relay';
import {createHashHistory, createHistory} from 'history';
import routes from './routes';

let supports_history_api = function () {
  return !!(window.history && window.history.pushState);
};

const history = supports_history_api() ?
  createHistory() :
  createHashHistory({queryKey: false});

ReactDOM.render(
    <RelayRouter history={history} routes={routes} />,
  document.getElementById('root')
);
