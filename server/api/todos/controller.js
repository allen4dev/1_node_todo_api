const Todo = require('./model');

// Route: .param(id)
exports.param = (req, res, next, id) => {
  Todo.findById(id)
    .populate('author categories')
    .then(todo => {
      if (!todo) return next(new Error(`Todo with id ${id} not found`));

      req.todo = todo;
      next();
    })
    .catch(next);
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
  const { body, user } = req;
  body.author = user.id;
  const todo = new Todo(body);

  todo
    .save()
    .then(created => {
      res.status(200).send({ todo: created });
    })
    .catch(next);
};

// Route: /:id
exports.getSingle = (req, res) => {
  res.send({ todo: req.todo });
};

exports.updateOne = (req, res, next) => {
  const { todo, user } = req;
  // const { body, completed } = req.body;
  const { body } = req;
  let { categories, ...updatedTodo } = body;

  if (typeof body.completed === 'boolean' && body.completed) {
    updatedTodo.completedAt = Date.now();
  } else {
    updatedTodo.completedAt = null;
    updatedTodo.completed = false;
  }

  if (!categories) {
    categories = [];
  }

  Todo.findOneAndUpdate(
    { _id: todo.id, author: user.id },
    {
      ...updatedTodo,
      $addToSet: { categories: { $each: categories } },
    },
    {
      new: true,
    }
  )
    .then(updated => {
      if (!updated)
        return Promise.reject(new Error(`Todo ${todo.id} not found`));

      res.send({ todo: updated });
    })
    .catch(next);
};

exports.deleteOne = (req, res, next) => {
  const { todo, user } = req;

  Todo.findOneAndRemove({ _id: todo.id, author: user.id })
    .then(deleted => {
      if (!deleted)
        return Promise.reject(new Error(`Todo ${todo.id} not found`));

      res.send({ todo: deleted });
    })
    .catch(next);
};

// Route: /category/:categoryId
exports.getByCategory = (req, res, next) => {
  Todo.find({
    author: req.user._id,
    categories: {
      $in: [req.params.categoryId],
    },
  })
    .then(todos => {
      if (!todos)
        return Promise.reject(
          new Error(`No todos for category: ${req.params.categoryId}`)
        );

      res.status(200).send({ todos });
    })
    .catch(next);
};
