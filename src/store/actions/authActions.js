import * as actionTypes from './actionTypes';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../../utils/setAuthToken';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const signupSuccess = (user) => {
    return{
        type: actionTypes.SIGNUP_SUCCESS,
        user: user
    };
};

export const loginSuccess = (token) => {
    return{
        type: actionTypes.LOGIN_SUCCESS,
        token: token
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};



export const signUp = (userData, history) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:5000/signup', userData)
        .then(response => {
            dispatch(signupSuccess(response.data.user));
        })
        
        .catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data));
        });
    };
};
export const login = (userData) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:5000/login', userData)
        .then(response => {
            localStorage.setItem("token", response.data.token);
            setAuthToken(response.data.token);
            console.log(response);
            const decoded = jwt_decode(localStorage.token);
            dispatch(loginSuccess(decoded));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data));
        });
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    return {
        type: actionTypes.AUTH_LOGOUT
    }

}