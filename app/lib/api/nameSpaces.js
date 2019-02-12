import * as API from './extensions.js';
import { ApiError } from './response';

/**
 * Get the available namespaces
 */
const getNameSpaces = () => {
  return fetch(API.NAMESPACES(), {
    method: 'get',
    cache: 'no-cache'
  })
    .then(res => {
      if (res.ok) return res.json();
      return res.json().then(e => {
        return new ApiError({ msg: e.msg, status: res.status });
      });
    })
    .then(response => {
      if (response instanceof ApiError) {
        return { error: response.msg };
      }
      return response;
    })
    .catch(error => ({ error }));
};

/**
 * Get the functions in namespace
 */
const getNameSpace = nameSpace =>
  fetch(API.NAMESPACE(nameSpace), { method: 'get', cache: 'no-cache' })
    .then(res => {
      if (res.ok) return res.json();
      return res.json().then(e => {
        return new ApiError({ msg: e.msg, status: res.status });
      });
    })
    .then(response => {
      if (response instanceof ApiError) {
        return { error: response.msg };
      }
      return { nameSpace: nameSpace, functions: response };
    })
    .catch(error => ({ error }));

/**
 * Create a namespace
 * @param {String} nameSpace
 */
const createNameSpace = nameSpace =>
  fetch(API.NAMESPACES(), {
    method: 'post',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ name: nameSpace })
  })
    .then(res => {
      if (res.ok) return res.json();
      return res.json().then(e => {
        return new ApiError({ msg: e.msg, status: res.status });
      });
    })
    .then(response => {
      if (response instanceof ApiError) {
        return { error: response.msg };
      }
      return { response };
    })
    .catch(error => ({ error }));

/**
 * Delete namespace
 */
const deleteNamespace = namespace =>
  fetch(API.NAMESPACE(namespace), {
    method: 'delete',
    cache: 'no-cache'
  })
    .then(res => {
      if (res.ok) return res.json();
      return res.json().then(e => {
        return new ApiError({ msg: e.msg, status: res.status });
      });
    })
    .then(response => {
      if (response instanceof ApiError) {
        return { error: response.msg };
      }
      return { response };
    })
    .catch(error => ({ error }));

export { createNameSpace, getNameSpaces, getNameSpace, deleteNamespace };
