const { Router } = require('express');

const controller = require('./controller');
const { authenticate, signToken } = require('./');

const router = Router();

router.post('/signin', authenticate, signToken, controller.signin);

module.exports = router;
