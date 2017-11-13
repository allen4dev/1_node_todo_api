const { Router } = require('express');

const todos = require('./todos/router');
const users = require('./users/router');
const categories = require('./categories/router');

const router = Router();

router.use('/todos', todos);
router.use('/users', users);
router.use('/categories', categories);

module.exports = router;
