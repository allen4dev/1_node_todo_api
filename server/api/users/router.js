const { Router } = require('express');

const controller = require('./controller');

const router = Router();

router.param('id', controller.param);
router.post('/', controller.post);
router
  .route('/:id')
  .get(controller.getSingle)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = router;
