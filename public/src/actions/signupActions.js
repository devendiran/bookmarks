"use strict";

import { SET_CURRENT_USER } from '../constants/actionTypes';
import auth from '../api/auth';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './authActions';

const signup = (data = {}) => {
    return dispatch => {
        return auth.signup(data).then(res => {
            const token = res.token;
            localStorage.setItem('jwtToken', token);
            console.log(setCurrentUser)
            dispatch(setCurrentUser(jwtDecode(token)));
        });
    };
}

export default signup;