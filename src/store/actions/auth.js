import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logOut = () => {
    return  {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkOutTimeOut = expirationTimeOut => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, expirationTimeOut * 1000);
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
        axios.post(url,authData)
        .then(result => {
            dispatch(authSuccess(result.data.idToken,result.data.localId))
            dispatch(checkOutTimeOut(result.data.expiresIn))
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error))

        })
    }
}