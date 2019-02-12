const axios = require('axios');
const API = require('../../extensions/pgFaas/index.js');

/**
 * Get namespaces
 * @param {Request} req Request
 * @param {Response} res Response
 */
function getNamespaces (req, res) {
  axios
    .get(API.NAMESPACES())
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res
        .status(error.response.status)
        .json({ msg: error.response.data.message });
    });
}

/**
 * Get namespace
 * @param {Request} req Request
 * @param {Response} res Response
 */
function getNamespace (req, res) {
  axios
    .get(API.NAMESPACE(req.params.namespace))
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res
        .status(error.response.status)
        .json({ msg: error.response.data.message });
    });
}

function createNameSpaces (req, res) {
  if (!req.body) {
    res.status(400).json({ msg: 'Missing body in payload.' });
  } else if (!req.body.name) {
    res.status(400).json({ msg: 'Payload must have a name key' });
  } else {
    axios
      .post(API.NAMESPACES(), req.body)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        res
          .status(error.response.status)
          .json({ msg: error.response.data.message });
      });
  }
}

/**
 * Deletes a namespace
 */
function deleteNamespace (req, res) {
  axios
    .delete(API.NAMESPACE(req.params.namespace))
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res
        .status(error.response.status)
        .json({ msg: error.response.data.message });
    });
}

module.exports = {
  getNamespaces: getNamespaces,
  getNamespace: getNamespace,
  createNameSpaces: createNameSpaces,
  deleteNamespace: deleteNamespace
};
