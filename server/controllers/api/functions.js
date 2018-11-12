const axios = require('axios');
const API = require('../../extensions/pgFaas/index.js');

/**
 * Get function details
 * @param {Request} req Request
 * @param {Response} res Response
 */
function getFunction (req, res) {
  axios.get(API.FUNCTION(req.params.namespace, req.params.function))
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.status(500).json({msg: error.message});
    });
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
        res.status(500).json({msg: error.message});
      });
  }
}

/**
 * Create a function
 * @param {Request} req Request
 * @param {Response} res Response
 */
function createFunction(req, res) {
  if (!req.body) {
    res.status(400).send({msg: 'Missing body in payload.'});
  } else if (!req.body.name) {
    res.status(400).send({msg: 'Payload must have a name key'});
  } else if (!req.body.sourcecode) {
    res.status(400).send({msg: 'Payload must have a sourcecode key'});
  } else if (!req.body.test) {
    res.status(400).send({msg: 'Payload must have a test key'});
  } else {
    try {
      const test = JSON.parse(req.body.test);
      axios({
          method: 'post',
          url: API.NAMESPACE(req.params.namespace),
          data: {name: req.body.name, sourcecode: req.body.sourcecode, test: test },
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
        .then(function (response) {
          res.status(200).json(response.data);
        })
        .catch(function (error) {
          res.status(500).json({msg: error.message, data: error.response.data});
        });
    } catch(err) {
      res.status(500).json({msg: err.message});
    }
  }
}

/*
 * Invoke a function
 * @param {Request} req Request
 * @param {Response} res Response
 */
function invokeFunction(req, res) {
  if (!req.body) {
    res.status(400).send({msg: 'Missing body in payload.'});
  } else if (!req.body.test) {
    res.status(400).send({msg: 'Payload must have a  test key'});
  } else {
    axios.post(
        API.FUNCTION(req.params.namespace, req.params.function),
        req.body.test
      )
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        res.status(500).json({msg: error.message, data: error.data});
      });
  }
}

/**
 * Delete a function
 * @param {Request} req Request
 * @param {Response} res Response
 */
function deleteFunction(req, res) {
  axios.delete(API.FUNCTION(req.params.namespace, req.params.function))
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.status(500).json({msg: error.message});
    });
}


module.exports = {
  getFunction: getFunction,
  updateFunction: updateFunction,
  createFunction: createFunction,
  invokeFunction: invokeFunction,
  deleteFunction: deleteFunction
}
