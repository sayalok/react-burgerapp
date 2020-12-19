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
    localStorage.removeItem('token')
    localStorage.removeItem('expiresIn')
    localStorage.removeItem('userId');
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
            const expirationDate = new Date(new Date().getTime() + result.data.expiresIn * 1000);
            localStorage.setItem('token', result.data.idToken);
            localStorage.setItem('expiresIn', expirationDate);
            localStorage.setItem('userId', result.data.localId);
            dispatch(authSuccess(result.data.idToken,result.data.localId))
            dispatch(checkOutTimeOut(result.data.expiresIn))
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error))

        })
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(logOut())
            console.log('token not found');
        }else{
            const expiresTime   = new Date(localStorage.getItem('expiresIn'))
            const userId        = localStorage.getItem('userId');

            if (expiresTime > new Date()) {
                dispatch(authSuccess(token,userId)) 
                dispatch(checkOutTimeOut(expiresTime.getSeconds() - new Date().getSeconds()))
            }else {
                console.log('expires issue');
                dispatch(logOut())
            }
        }
        
        
    }
}