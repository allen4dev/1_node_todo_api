const Todo = require('./model');

// Route: .param(id)
exports.param = (req, res, next, id) => {
  Todo.findById(id)
    .then(todo => {
      if (!todo) return next(new Error(`Todo with id ${id} not found`));

      req.todo = todo;
      next();
    })
    .catch(err => {
      next(err);
    });
};

// Route: /
exports.get = (req, res) => {
  Todo.find({}).then(todos => {
    res.status(200).send({ todos });
  });
};

exports.post = (req, res) => {
  const { body } = req.body;
  const todo = new Todo({ body });

  todo
    .save()
    .then(created => {
      res.status(200).send({ todo: created });
    })
    .catch(err => next(err));
};

// Route: /:id
exports.getSingle = (req, res) => {
  res.send({ todo: req.todo });
};

exports.updateOne = (req, res, next) => {
  const todo = req.todo;
  const { body, completed } = req.body;
  const updatedTodo = { body, completed };

  if (typeof completed === 'boolean' && completed) {
    updatedTodo.completedAt = Date.now();
  } else {
    updatedTodo.completedAt = null;
    updatedTodo.completed = false;
  }

  updatedTodo.body = body || todo.body;

  Todo.findOneAndUpdate(todo.id, updatedTodo, { new: true }).then(updated => {
    if (!updated) return res.status(404).send({});
    res.send({ todo: updated });
  });
};

exports.deleteOne = (req, res, next) => {
  const todo = req.todo;

  Todo.findOneAndRemove(todo.id).then(deleted => {
    if (!deleted) return res.status(404).send({});

    res.send({ todo: deleted });
  });
};
