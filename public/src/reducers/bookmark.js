"use strict";

import {
  MODIFY_BOOKMARK
} from '../constants/actionTypes'

const initialState = {
  bookmark: {}
}

const bookmark = (state = initialState.bookmark, action) => {
  switch (action.type) {
    case MODIFY_BOOKMARK:
      return Object.assign(state, action.bookmark);
    default:
      return state;
  }
}

export default bookmark;