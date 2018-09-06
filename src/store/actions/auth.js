import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function authUser(type, userData) {
  return dispatch => {
    //have to wait till api call finishes, so we need to use promises
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData).then(user => {
        localStorage.setItem("jwtToken", user.token);
        dispatch(setCurrentUser(user));
        resolve();
      });
    });
  };
}
