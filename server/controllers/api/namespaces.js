const axios = require('axios');
const API = require('../../extensions/pgFaas/index.js');

/**
 * Get namespaces
 * @param {Request} req Request
 * @param {Response} res Response
 */
function getNamespaces (req, res) {
  axios.get(API.NAMESPACES())
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.status(500).send({msg: error});
    })
}

/**
 * Get namespace
 * @param {Request} req Request
 * @param {Response} res Response
 */
function getNamespace (req, res) {
  axios.get(API.NAMESPACE(req.params.namespace))
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.status(500).send({msg: error});
    })
}

module.exports = {
  getNamespaces: getNamespaces,
  getNamespace: getNamespace
}
