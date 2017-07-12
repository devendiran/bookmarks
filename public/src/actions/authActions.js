"use strict";

import { SET_CURRENT_USER, LOG_OUT_USER } from '../constants/actionTypes';
import auth from '../api/auth';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils';


export const setCurrentUser = (user = {}) => {
  return {
    type: SET_CURRENT_USER,
    user
  };
};

export const logoutUser = (user = {}) => {
  return {
    type: LOG_OUT_USER,
    user
  };
};

export const logout = (user = {}) => {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(logoutUser());
  }
};

export const login = (user = {}) => {
  return dispatch => {
    return auth.login(user).then(res => {
      const token = res.token;
      localStorage.setItem('jwtToken', token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
};
