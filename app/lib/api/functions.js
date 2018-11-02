import * as API from './extensions.js';

/**
 * Get details for a function in a namespace
 * @param {String} nSpace
 * @param {String} fName
 */
const getFunction = (nSpace, fName) =>
  fetch(API.FUNCTION(nSpace, fName), { method: 'get', cache: 'no-cache' })
    .then(res => res.json())
    .then(res => ({
      nSpace: nSpace,
      fName: fName,
      code: res.sourcecode,
      testInput: res.test
    }));

/**
 * Update a function
 * @param {String} nSpace
 * @param {String} fName
 */
const updateFunction = (nSpace, fName, code) => fetch(
  API.FUNCTION(nSpace, fName),
  {
    method: 'put',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({'function': code })
  })
  .then(res => {
    if (res.ok) return res.json();
    throw Error(res.statusText);
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

/**
 * Create a function
 * @param {String} nSpace
 * @param {String} fName
 * @param {String} code
 * @param {String} testCode
 */
const createFunction = (nSpace, fName, code, testCode) => fetch(
  API.NAMESPACE(nSpace),
  {
    method: 'post',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      'name': fName,
      'sourcecode': code,
      'test': testCode
    })
  })
  .then(res => {
    if (res.ok) return res.json();
    throw Error(res.statusText);
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

/**
 * Invoke a function
 * @param {String} nSpace
 * @param {String} fName
 * @param {String} testCode
 */
const invokeFunction = (nSpace, fName, testCode) => fetch(
  API.FUNCTION(nSpace, fName),
  {
    method: 'post',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({test: testCode})
  })
  .then(res => {
    if (res.ok) return res.text();
    throw Error(res.statusText);
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

/**
 * Invoke a function
 * @param {String} nSpace
 * @param {String} fName
 */
const deleteFunction = (nSpace, fName) => fetch(
  API.FUNCTION(nSpace, fName),
  {
    method: 'delete',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  })
  .then(res => {
    if (res.ok) return res.json();
    throw Error(res.statusText);
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export {
  createFunction,
  deleteFunction,
  getFunction,
  invokeFunction,
  updateFunction
};
