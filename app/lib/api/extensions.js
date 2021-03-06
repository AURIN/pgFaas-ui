const BASE_URL = 'api/v1';

module.exports = {
  NAMESPACES: () => BASE_URL + '/namespaces',
  NAMESPACE: (nSpace) => BASE_URL + `/namespaces/${nSpace}`,
  FUNCTION: (nSpace, fName) => BASE_URL + `/namespaces/${nSpace}/${fName}`,
  TABLES: () => BASE_URL + '/database/tables',
  TABLE: table => BASE_URL + `/database/tables/${table}`
};
