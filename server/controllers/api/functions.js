const axios = require('axios');
const API = require('../../extensions/pgFaas/index.js');

/**
 * Get namespace
 * @param {Request} req Request
 * @param {Response} res Response
 */
function getFunction (req, res) {
  axios.get(API.FUNCTION(req.params.namespace, req.params.function))
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.status(500).send({msg: error});
    })
}

/**
 * Update a function
 * @param {Request} req Request
 * @param {Response} res Response
 */
function updateFunction(req, res) {
  if (!req.body) {
    res.status(400).send({msg: 'Missing body in payload.'});
  } else if (!req.body.function) {
    res.status(400).send({msg: 'Payload must have a function key'});
  } else {
    axios.put(
        API.FUNCTION(req.params.namespace, req.params.function),
        req.body
      )
      .then(function (response) {
        res.status(200).json(response.data)
      })
      .catch(function (error) {
        res.status(500).json(error);
      })
  }
}

/**
 * Create a function
 * @param {Request} req Request
 * @param {Response} res Response
 */
function createFunction(req, res) {
  axios.post(API.FUNCTION(req.params.namespace, req.params.function))
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.status(500).send({msg: error});
    })
}

module.exports = {
  getFunction: getFunction,
  updateFunction: updateFunction,
  createFunction: createFunction
}
