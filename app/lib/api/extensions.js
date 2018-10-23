const BASE_URL = '/api/v1';

module.exports = {
  NAMESPACES: () => BASE_URL + '/namespaces',
  NAMESPACE: (name) => BASE_URL + `/namespaces/${name}`
};
