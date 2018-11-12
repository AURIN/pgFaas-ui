const config = require('config');
const BASE_URL = config.get('PGFAAS.URL_BASE')

module.exports = {
  NAMESPACES: () => BASE_URL + '/function/namespaces',
  NAMESPACE: (nSpace) => BASE_URL + `/function/namespaces/${nSpace}`,
  FUNCTION: (nSpace, fName) => BASE_URL + `/function/namespaces/${nSpace}/${fName}`,
  DATABASES: () => BASE_URL + '/database/tables',
  DATABASE: (db) => BASE_URL + `/database/tables/${db}`
};
