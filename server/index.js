const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const Todo = require('./models/Todo');

const app = express();

app.use(bodyParse.json());

app.get('/api/todos', (req, res) => {
  Todo.find({}).then(todos => {
    res.status(200).send({ todos });
  });
});

app.post('/api/todos', (req, res) => {
  const todo = new Todo(req.body);

  todo.save().then(created => {
    res.status(200).send({ todo: created });
  });
});

module.exports = app;
