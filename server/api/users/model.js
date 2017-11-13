const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    default: '',
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

UserSchema.methods.generateAuthToken = function generateToken() {
  const token = jwt.sign({ id: this.id }, 'secret');
  return Promise.resolve(token);
};

UserSchema.statics.findByToken = function findUserByToken(token) {
  let decoded;

  try {
    decoded = jwt.verify(token, 'secret');
  } catch (e) {
    return Promise.reject();
  }

  return this.findById(decoded.id);
};

UserSchema.statics.authenticate = function authenticateWithCredentials(
  email,
  password,
) {
  return this.findOne({ email }).then(user => {
    if (!user) return Promise.reject();

    return bcrypt.compare(password, user.password).then(res => {
      if (res) return user;
      return Promise.reject();
    });
  });
};

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
