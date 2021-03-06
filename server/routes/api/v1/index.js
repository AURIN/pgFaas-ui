/**
 * Add private application routes.
 * @param {Object} app Express application
 */
const Namespaces = require('../../../controllers/api/namespaces.js');
const Functions = require('../../../controllers/api/functions.js');
const Databases = require('../../../controllers/api/databases.js');

module.exports = function (app) {
  app.get('/api/v1/database/tables', Databases.getTables);
  app.get('/api/v1/database/tables/:table', Databases.getTable);
  app.get('/api/v1/namespaces', Namespaces.getNamespaces);
  app.get('/api/v1/namespaces/:namespace', Namespaces.getNamespace);
  app.get('/api/v1/namespaces/:namespace/:function', Functions.getFunction);

  app.put('/api/v1/namespaces/:namespace/:function', Functions.updateFunction);

  app.post('/api/v1/namespaces', Namespaces.createNameSpaces);
  app.post('/api/v1/namespaces/:namespace', Functions.createFunction);
  app.post('/api/v1/namespaces/:namespace/:function', Functions.invokeFunction);

  app.delete('/api/v1/namespaces/:namespace/:function', Functions.deleteFunction);
  app.delete('/api/v1/namespaces/:namespace/', Namespaces.deleteNamespace);
};
