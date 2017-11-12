const User = require('./model');

exports.param = (req, res, next, id) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user)
        return next(new Error(`User with id: ${req.params.id} not found`));

      req.user = user;
      next();
    })
    .catch(next);
};
// Route: /
exports.post = (req, res, next) => {
  const { email, password } = req.body;
  const user = new User({ email, password });

  user
    .save()
    .then(created => {
      if (!created)
        return next(new Error('An error ocurred during creation of user'));

      res.status(200).send({ user: created });
    })
    .catch(next);
};

// Route: /:id
exports.getSingle = (req, res, next) => {
  res.send({ user: req.user });
};

exports.updateOne = (req, res, next) => {
  const { body: { fullname, username }, user } = req;

  User.findOneAndUpdate(user.id, { fullname, username }, { new: true })
    .then(updated => {
      if (!updated) return res.status(404).send({});

      res.status(200).send({ user: updated });
    })
    .catch(next);
};

exports.deleteOne = (req, res, next) => {
  User.findOneAndRemove(req.user.id).then(removed => {
    if (!removed) return res.status(404).send({});

    res.status(200).send({ user: removed });
  });
};
