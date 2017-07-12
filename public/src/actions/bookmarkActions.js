"use strict";

import { SET_BOOKMARKS, ADD_TO_BOOKMARKS, MODIFY_BOOKMARK, REMOVE_BOOKMARK } from '../constants/actionTypes';
import bookmarks from '../api/bookmarks';

export const setBookMarks = (bookmarks = []) => {
    return {
        type: SET_BOOKMARKS,
        bookmarks
    };
};

export const addBookMarks = (bookmark) => {
    return {
        type: ADD_TO_BOOKMARKS,
        bookmark
    };
};

export const modifyBookMark = (bookmark) => {
    return {
        type: MODIFY_BOOKMARK,
        bookmark
    };
}

export const removeBookmark = (id) => {
    return {
        type: REMOVE_BOOKMARK,
        id
    };
}


export const fetchBookMarks = () => {
    return dispatch => {
        return bookmarks.fetchBookMarks().then(res => {
            dispatch(setBookMarks(res));
        });
    };
}

export const createBookMark = (data) => {
    return dispatch => {
        return bookmarks.createBookMark(data).then(res => {
            dispatch(addBookMarks(res));
        });
    };
}

export const updateBookMark = (data) => {
    return dispatch => {
        return bookmarks.updateBookMark(data).then(res => {
            dispatch(modifyBookMark(res));
        });
    };
}

export const deleteBookMark = (data) => {
    return dispatch => {
        return bookmarks.updateBookMark(data).then(res => {
            dispatch(removeBookmark(data._id));
        });
    };
}

export const fetchBookMarksByTag = (data) => {
    return dispatch => {
        return bookmarks.fetchBookMarksByTag(data).then(res => {
            dispatch(setBookMarks(res));
        });
    };
}