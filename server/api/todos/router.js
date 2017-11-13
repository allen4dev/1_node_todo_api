const { Router } = require('express');

const controller = require('./controller');

const { ensureAuth } = require('./../../auth');

const router = Router();

router.param('id', controller.param);

router
  .route('/')
  .get(ensureAuth, controller.get)
  .post(ensureAuth, controller.post);

router
  .route('/:id')
  .get(controller.getSingle)
  .put(ensureAuth, controller.updateOne)
  .delete(ensureAuth, controller.deleteOne);

router.get('/categories/:categoryId', ensureAuth, controller.getByCategory);

module.exports = router;
