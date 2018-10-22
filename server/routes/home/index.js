const express = require('express');

/**
 * Add home view routes.
 * @param {Object} app Express application
 */
module.exports = function (app) {
  'use strict';

  app.use('/home', express.static('dist'));
};

