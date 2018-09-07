import axios from "axios";

// functions for api requests

//attach down header to any request going to server,
// so the server knows who we are, and we a logged in
export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    //when user logs out, delete the header:
    delete axios.defaults.headers.common["Authorization"];
  }
}

/**
 * A wrapper around axios API call that formats errors etc.
 * @param {string} method, the HTTP verb u wnt to use
 * @param {string} path ,the route path/endpoint
 * @param {object} data, (optional) data in JSON format form POST requests
 */

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method](path, data)
      .then(res => {
        return resolve(res.data); // data sent by server
      })
      .catch(err => {
        return reject(err.response.data.error); //data.error defined in server file
      });
  });
}
