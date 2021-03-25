import * as actionTypes from '../actions/actionTypes';
//helper func to clone object
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null }); //setting these to null logs out the user
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //prettier-ignore
    case actionTypes.AUTH_START: return authStart(state, action)
    //prettier-ignore
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    //prettier-ignore
    case actionTypes.AUTH_FAIL: return authFail(state, action)
    //prettier-ignore
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
    //prettier-ignore
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
    default:
      return state;
  }
};

export default reducer;
