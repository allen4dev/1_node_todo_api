const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
  body: {
    type: String,
    minlength: 1,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  completedAt: {
    type: Date,
    default: null,
  },
  // author        _id reference to User model (populate this)
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
