/**
 * Add private application routes.
 * @param {Object} app Express application
 */
const Namespaces = require('../../../controllers/api/namespaces.js');

module.exports = function (app) {
  app.get('/api/v1/namespaces', Namespaces.getNamespaces)
  app.get('/api/v1/namespaces/:namespace', Namespaces.getNamespace)
};
