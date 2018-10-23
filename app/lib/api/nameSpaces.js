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
const getNameSpace = (nameSpace) => {
  return fetch(
    API.NAMESPACE(nameSpace),
    {
      method: 'get',
      cache: 'no-cache'
    })
    .then(res => res.json())
    .then(res => { return {nameSpace: nameSpace, functions: res}; });
};

export {
  getNameSpaces,
  getNameSpace
};
