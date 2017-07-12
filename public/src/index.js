"use strict";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import LogInPage from './components/LogInPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from './utils';
import { setCurrentUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.css';
import '../stylesheets/main.css';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Dashboard} onEnter={requireAuth} />
        <Route path="signin" component={LogInPage} />
        <Route path="signup" component={SignUpPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);


function requireAuth(nextState, replace) {
  let { user } = store.getState();
  const isLoggingIn = Object.keys(user).length;

  if (!isLoggingIn) {

    replace({
      pathname: '/signin'
    });
  }
}