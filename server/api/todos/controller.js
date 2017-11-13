const Todo = require('./model');

// Route: .param(id)
exports.param = (req, res, next, id) => {
  Todo.findById(id)
    .populate('author')
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
  Todo.find({
    author: req.user.id,
  }).then(todos => {
    res.status(200).send({ todos });
  });
};

exports.post = (req, res, next) => {
  // const { body } = req.body;
  const { body: { body }, user } = req;
  const todo = new Todo({ body, author: user.id });

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
  const { todo, user } = req;
  // const { body, completed } = req.body;
  const { body } = req;
  const updatedTodo = body;

  if (typeof body.completed === 'boolean' && body.completed) {
    updatedTodo.completedAt = Date.now();
  } else {
    updatedTodo.completedAt = null;
    updatedTodo.completed = false;
  }

  // updatedTodo.body = body || todo.body;

  Todo.findOneAndUpdate({ _id: todo.id, author: user.id }, updatedTodo, {
    new: true,
  }).then(updated => {
    if (!updated) return res.status(404).send({});
    res.send({ todo: updated });
  });
};

exports.deleteOne = (req, res, next) => {
  const { todo, user } = req;

  Todo.findOneAndRemove({ _id: todo.id, author: user.id }).then(deleted => {
    if (!deleted) return res.status(404).send({});

    res.send({ todo: deleted });
  });
};
