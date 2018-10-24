const config = require('config');
const BASE_URL = config.get('PGFAAS.URL_BASE')

module.exports = {
  NAMESPACES: () => BASE_URL + '/',
  NAMESPACE: (nSpace) => BASE_URL + `/${nSpace}`,
  FUNCTION: (nSpace, fName) => BASE_URL + `/${nSpace}/${fName}`
};
