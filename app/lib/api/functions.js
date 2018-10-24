import * as API from './extensions.js';

/**
 * Get details for a function in a namespace
 * @param {String} nSpace
 * @param {String} fName
 */
const getFunction = (nSpace, fName) => {
  return fetch(
    API.FUNCTION(nSpace, fName),
    {
      method: 'get',
      cache: 'no-cache'
    })
    .then(res => res.text())
    .then(res => ({
      nSpace: nSpace,
      fName: fName,
      code: res
    }));
};

/**
 * Get details for a function in a namespace
 * @param {String} nSpace
 * @param {String} fName
 */
const updateFunction = (nSpace, fName, code) => {
  return fetch(
    API.FUNCTION(nSpace, fName),
    {
      method: 'put',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({'function': code })
    })
    .then(res => res.json())
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

export {
  getFunction,
  updateFunction
};
