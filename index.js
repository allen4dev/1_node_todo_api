const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const Todo = require('./models/Todo');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo-api');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to mongoose'));

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

const server = http.createServer(app);

server.listen(8080, () => console.log('Server running in port 8080'));
