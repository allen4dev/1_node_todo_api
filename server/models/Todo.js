const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const TodoSchema = new Schema({
  body: String,
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
