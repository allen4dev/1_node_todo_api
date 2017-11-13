const { Router } = require('express');

const controller = require('./controller');
const { ensureAuth } = require('./../../auth');

const router = Router();

router.param('id', controller.param);
router.post('/', controller.post);

router
  .route('/me')
  .get(ensureAuth, controller.getMe)
  .put(ensureAuth, controller.updateOne)
  .delete(ensureAuth, controller.deleteOne);

router.get('/:id', controller.getSingle);

module.exports = router;
