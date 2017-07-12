"use strict";

import { ADD_TO_BOOKMARKS, SET_BOOKMARKS, MODIFY_BOOKMARK, REMOVE_BOOKMARK } from '../constants/actionTypes';
import bookmark from './bookmark';

const initialState = {
  bookmarks: []
}

const bookmarks = (state = initialState.bookmarks, action) => {
  switch (action.type) {
    case ADD_TO_BOOKMARKS:
      return [...state, action.bookmark]
    case SET_BOOKMARKS:
      return action.bookmarks || []
    case MODIFY_BOOKMARK:
      return state.map((item) => {
        if (item._id === action.bookmark._id) {
          return bookmark(item, action);
        } else {
          return item;
        }
      })
    case REMOVE_BOOKMARK:
      return state.filter((item) => {
        if (item._id !== action.id) {
          return item;
        }
      })
    default:
      return state;
  }
}

export default bookmarks;