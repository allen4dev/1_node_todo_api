const { Router } = require('express');

const todos = require('./todos/router');
const users = require('./users/router');

const router = Router();

router.use('/todos', todos);
router.use('/users', users);

module.exports = router;
