/**
 * Add private application routes.
 * @param {Object} app Express application
 */
const test = require('../../../controllers/api/test.js');

module.exports = function (app) {
  'use strict';
  app.get('/api/v1/test', test)
};
