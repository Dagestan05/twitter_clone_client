import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from './errors';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
//funct to set jwt auth token to all requests
export function setAuthorizationToken(token) {
  setTokenHeader(token)
}

export function authUser(type, userData) {
  return dispatch => {
    //have to wait till api call finishes, so we need to use promises
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData).then(user => {
        localStorage.setItem("jwtToken", user.token);
        //set jwt token headet to all future requests
        setAuthorizationToken(user.token)
        dispatch(setCurrentUser(user));
        //remove errors from state, if there are
        dispatch(removeError());
        resolve();
      })
      .catch(err =>{
        dispatch(addError(err.message)); //err obj comes from server
        reject(); //Api call failed
      })
    });
  };
}

export function logout(){
  return dispatch =>{
    localStorage.clear();
    //clear auth jwt token from request headers
    setAuthorizationToken(false);
    //dispatch setCurrentUser with empty obj, to clear currentUser from state
    dispatch(setCurrentUser({}));
  }
}