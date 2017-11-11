const { Router } = require('express');

const todos = require('./todos/router');

const router = Router();

router.use('/todos', todos);

module.exports = router;
