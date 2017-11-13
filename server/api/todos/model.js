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
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      reference: 'Category',
    },
  ],
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
