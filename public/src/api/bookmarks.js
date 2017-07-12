"use strict";
import axios from 'axios';

const fetchBookMarks = () => {
    return axios.get('/api/bookmarks', )
        .then((res) => {
            if (res && res.data) {
                return res.data;
            }
        });
};

const createBookMark = (bookmark) => {
    return axios.post('/api/bookmarks/create', bookmark)
        .then((res) => {
            if (res && res.data) {
                return res.data;
            }
        });
};

const updateBookMark = (bookmark) => {
    return axios.put(`/api/bookmarks/${bookmark._id}`, bookmark)
        .then((res) => {
            console.log(res);
            if (res && res.data) {
                return res.data;
            }
        });
};

const fetchBookMarksByTag = (data) => {
    return axios.get(`/api/bookmarks/${data}`)
        .then((res) => {
            if (res && res.data) {
                return res.data;
            }
        });
};

export default { fetchBookMarks, createBookMark, updateBookMark, fetchBookMarksByTag };