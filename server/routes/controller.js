exports.get = (req, res, next) => {
  res.render('index', { title: 'My first nodejs project' });
};
