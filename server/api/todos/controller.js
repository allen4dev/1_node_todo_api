const Todo = require('./model');

exports.get = (req, res) => {
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
