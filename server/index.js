const express = require('express');
const mongoose = require('mongoose');

const api = require('./api');

const app = express();

// setup the app middlware
require('./middlewares/appMiddleware')(app);

app.use('/api', api);

// Error handler middleware
app.use(function(err, req, res, next) {
  console.log('ERROR: ', err.message);
  res.status(500).send('Oops');
});

module.exports = app;
