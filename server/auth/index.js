const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bearer = require('token-extractor');

const User = mongoose.model('User');

exports.ensureAuth = (req, res, next) => {
  const token = bearer(req, (err, token) => {
    if (err) return next(err);

    User.findByToken(token)
      .then(user => {
        if (!user) return Promise.reject();

        console.log('USER: ', user);

        req.user = user;
        req.token = token;
        next();
      })
      .catch(e => {
        res.status(401).send({});
      });
  });
};
