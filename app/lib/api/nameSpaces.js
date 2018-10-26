import * as API from './extensions.js';

/**
 * Get the available namespaces
 */
const getNameSpaces = () => {
  return fetch(
    API.NAMESPACES(),
    {
      method: 'get',
      cache: 'no-cache'
    })
    .then(res => {
      if (res.ok) return res.json();
      throw Error(res.statusText);
    })
    .catch(err => { throw Error(err); });
};

/**
 * Get the functions in namespace
 */
const getNameSpace = (nameSpace) =>
  fetch(API.NAMESPACE(nameSpace), { method: 'get', cache: 'no-cache' })
    .then(res => {
      if (res.ok) return res.json();
      throw Error(res.statusText);
    })
    .then(res => { return {nameSpace: nameSpace, functions: res}; });

/**
 * Create a namespace
 * @param {String} nameSpace
 */
const createNameSpace = nameSpace =>
  fetch(
    API.NAMESPACES(),
    {
      method: 'post',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({'name': nameSpace})
    })
    .then(res => {
      if (res.ok) return res.json();
      throw Error(res.statusText);
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));

/**
 * Delete namespace
 */
const deleteNamespace = namespace =>
  fetch(
    API.NAMESPACE(namespace),
    {
      method: 'delete',
      cache: 'no-cache'
    })
    .then(res => {
      if (res.ok) return res.json();
      throw Error(res.statusText);
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));

export {
  createNameSpace,
  getNameSpaces,
  getNameSpace,
  deleteNamespace
};
