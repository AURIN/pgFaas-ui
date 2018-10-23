const config = require('config');
const BASE_URL = config.get('PGFAAS.URL_BASE')

module.exports = {
  NAMESPACES: () => BASE_URL + '/',
  NAMESPACE: (name) => BASE_URL + `/${name}`
};
