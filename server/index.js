const express = require('express');
const mongoose = require('mongoose');

const api = require('./api');
const auth = require('./auth/router');

const app = express();

// setup the app middlware
require('./middlewares/appMiddleware')(app);

app.use('/api', api);
app.use('/auth', auth);

// Error handler middleware
app.use(function(err, req, res, next) {
  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message });
  }

  if (err.message.match(/Unauthorized/)) {
    return res.status(401).send({ error: err.message });
  }

  res.status(500).send({ error: err.message });
});

module.exports = app;
