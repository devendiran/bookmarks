"use strict";
import { combineReducers } from 'redux';
import bookmarks from './bookmarklist';
import auth from './auth';

const rootReducer = combineReducers({
  bookmarks,
  user: auth
});

export default rootReducer;