const mongoose = require('mongoose');
const uuid = require('uuid');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    validate: {
      validator: validator.isEmail,
      message: '${VALUE} is not a valid email',
    },
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

UserSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        // if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
