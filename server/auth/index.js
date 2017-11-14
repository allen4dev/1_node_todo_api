const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bearer = require('token-extractor');

// const User = mongoose.model('User');
const User = require('./../api/users/model');

exports.ensureAuth = (req, res, next) => {
  const token = bearer(req, (err, token) => {
    if (err) return next(new Error('Unauthorized'));

    User.findByToken(token)
      .then(user => {
        if (!user) return next(new Error('User not found'));

        req.user = user;
        // req.token = token;
        next();
      })
      .catch(next);
  });
};

exports.authenticate = (req, res, next) => {
  const { email, password } = req.body;

  User.authenticate(email, password)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};

exports.signToken = (req, res, next) => {
  const token = jwt.sign({ id: req.user._id }, 'secret');
  req.token = token;
  next();
};
