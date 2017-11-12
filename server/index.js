const express = require('express');
const mongoose = require('mongoose');

const api = require('./api');

const app = express();

// setup the app middlware
require('./middlewares/appMiddleware')(app);

app.use('/api', api);

// Error handler middleware
app.use(function(err, req, res, next) {
  res.status(500).send({ error: err.message });
});

module.exports = app;
