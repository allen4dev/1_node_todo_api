const Todo = require('./model');

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

exports.get = (req, res, next) => {
  Todo.find({}).then(todos => {
    res.status(200).send({ todos });
  });
};

exports.post = (req, res) => {
  const todo = new Todo(req.body);

  todo.save().then(created => {
    res.status(200).send({ todo: created });
  });
};

exports.getSingle = (req, res) => {
  res.send({ todo: req.todo });
};
