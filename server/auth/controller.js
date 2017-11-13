const mongoose = require('mongoose');

exports.signin = (req, res, next) => {
  res.header('Authorization', `Bearer ${req.token}`).send({ token: req.token });
};
