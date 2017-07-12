"use strict";

import axios from 'axios';
import setAuthorizationToken from '../utils';

const login = (data) => {
    return axios.post('/api/auth/login', data)
        .then((res) => {
            if (res && res.data) {
                setAuthorizationToken(res.data.token);
                return res.data;
            }
        });
};

const signup = (data) => {
    return axios.post('/api/auth/signup', data)
        .then((res) => {
            console.log(res)
            if (res && res.data) {
                setAuthorizationToken(res.data.token);
                return res.data;
            }
        });
}

export default { login, signup }