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
    .then(res => res.json());
};

/**
 * Get the funciton in namespace
 */
const getNameSpace = (nameSpace) =>
  fetch(API.NAMESPACE(nameSpace), { method: 'get', cache: 'no-cache' })
    .then(res => res.json())
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
    .then(res => res.json())
    .then(response => ({ response }))
    .catch(error => ({ error }));

export {
  createNameSpace,
  getNameSpaces,
  getNameSpace
};
