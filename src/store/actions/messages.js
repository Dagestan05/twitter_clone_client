import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
})

export const fetchMessages = () =>{
  return dispatch =>{
    return apiCall("get", "/api/messages")
    .then(res =>
      dispatch(loadMessages(res))
    ).catch(err => dispatch(addError(err.message)))
  }
}

//action to add new message
export const postNewMessage = (text) =>(dispatch, getState)=>{
  let {currentUser } = getState(); //getState is redux method, returns last state
  const id = currentUser.user.id;

  return apiCall("post", `/api/users/${id}/messages`, {text})
    .then(res =>{}) //loadMessages will load automatically, when state changes
    .catch(err=> dispatch(addError(err.message)))
}