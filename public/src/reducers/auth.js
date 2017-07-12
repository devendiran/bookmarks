"use strict";
import {
  SET_CURRENT_USER, LOG_OUT_USER
} from '../constants/actionTypes';

const initialState = {
  session: {}
}

const session = (state = initialState.session, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign(state, action.user);
    case LOG_OUT_USER:
      return {};
    default:
      return state;
  }
}

export default session;