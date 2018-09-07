import React from 'react';
import {Provider} from 'react-redux';

import { configureStore } from '../store/index';

import {BrowserRouter} from "react-router-dom"
import Navbar from './Navbar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode'

const store = configureStore();

//check if jwt token exists in loacaStorage before laoding app
if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken) // set request header to include token
  //prevent someone from manually tempering w/ the key of jwtToken in LocalStorage
  try {
    //if there is a token, set the current user of whole app to be 
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  } catch (err) {
    store.dispatch(setCurrentUser({}));//if token is changed, log the user out
  }
}

const App = () =>{
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="onboarding">
        <Navbar />
        <Main />
      </div>
    </BrowserRouter>
  </Provider>
  )
}

export default App;
