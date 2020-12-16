import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email,pass,isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: pass,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDFG94tEylCj_UiuKKt_9w3oXHgdSbA1c'
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDFG94tEylCj_UiuKKt_9w3oXHgdSbA1c';
        }
        axios.post(
            url,
            authData
        )
        .then(result => {
            dispatch(authSuccess(result.data))
        })
        .catch(error => {
            dispatch(authFail(error))

        })
    }
}