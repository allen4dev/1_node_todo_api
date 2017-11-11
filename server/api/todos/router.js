const { Router } = require('express');

const controller = require('./controller');

const router = Router();

router
  .route('/')
  .get(controller.get)
  .post(controller.post);

module.exports = router;
