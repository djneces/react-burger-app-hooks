import * as actionTypes from './actionTypes';
import axios from 'axios';

//action creator
export const authStart = () => {
  return {
    //set loading state, spinner
    type: actionTypes.AUTH_START,
  };
};

//from axios.post I get response.data from firebase with idToken and localId, I pass it here, authSuccess passes on
//these 2 id's as props to auth reducer (under action.idToken, action.userId), => and reducer updates state
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  //dispatch after time (expiresIn), to logout user
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

//async doing authentication
export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    //https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    //method signup
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB09xRgwtpTEENmM2chk0hQKb4zB0TjcBY';
    if (!isSignup) {
      //method signin
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB09xRgwtpTEENmM2chk0hQKb4zB0TjcBY';
    }
    axios
      .post(url, authData)
      .then((response) => {
        // console.log(response);
        //saving into Local storage
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        ); //converts in ms
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        //token from firebase expires in 3600s
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        // console.log('[error]', error.message, error.response);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      //convert string from the LS to date object
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      // is later than today
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        //difference in s
        //prettier-ignore
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) /1000));
      }
    }
  };
};
