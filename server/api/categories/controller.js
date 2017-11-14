const Category = require('./model');

exports.getAll = (req, res, next) => {
  Category.find({ author: req.user.id })
    .then(categories => {
      if (!categories)
        return Promise.reject(
          new Error(`No categories for use with id: ${req.user.id}`)
        );

      return res.status(200).send({ categories });
    })
    .catch(next);
};

exports.post = (req, res, next) => {
  req.body.author = req.user.id;

  const category = new Category(req.body);

  category
    .save()
    .then(created => {
      res.status(200).send({ category: created });
    })
    .catch(next);
};
