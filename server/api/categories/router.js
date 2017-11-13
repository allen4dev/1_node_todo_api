const { Router } = require('express');
const controller = require('./controller');

const { ensureAuth } = require('./../../auth');

const router = Router();

router.get('/', ensureAuth, controller.getAll);
router.post('/', ensureAuth, controller.post);

module.exports = router;
