const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const api = require('./api');

const app = express();

app.use(bodyParse.json());

app.use('/api', api);

module.exports = app;
