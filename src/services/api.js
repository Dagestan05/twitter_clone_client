import axios from "axios";

// functions for api requests

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
