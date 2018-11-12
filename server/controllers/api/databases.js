/**
 * Theres only one database at the moment
 */
const axios = require('axios');
const API = require('../../extensions/pgFaas/index.js');

/**
 * Get tables
 * @param {Request} req Request
 * @param {Response} res Response
 */
function getTables (req, res) {
  axios.get(API.DATABASES())
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.status(500).json({msg: error.message});
    })
};

/**
 * Get columns in tables
 * @param {Request} req Request
 * @param {Response} res Response
 */
function getTable (req, res) {
  axios.get(API.DATABASE(req.params.table))
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.status(500).json({msg: error.message});
    })
};

module.exports = {
  getTables: getTables,
  getTable: getTable,
}
