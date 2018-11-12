import * as API from './extensions.js';

/**
 * Get the available tables
 */
const getTables = () => {
  return fetch(
    API.TABLES(),
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
 * Get the columns in a table
 */
const getTable = table =>
  fetch(API.TABLE(table), { method: 'get', cache: 'no-cache' })
    .then(res => {
      if (res.ok) return res.json();
      throw Error(res.statusText);
    })
    .then(res => { return {table: table, columns: res}; });

export {
  getTables,
  getTable
};
