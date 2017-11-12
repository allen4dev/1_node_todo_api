const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const UserSchema = new Schema({
  fullname: {
    type: String,
    trim: true,
    minlength: 2,
  },

  username: {
    type: String,
    trim: true,
    minlength: 1,
    unique: true,
    default: `User-${uuid()}`,
  },

  email: {
    type: String,
    trim: true,
    minlength: 1,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
