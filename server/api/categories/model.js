const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  author: {
    type: Schema.Types.ObjectId,
    reference: 'User',
  },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
