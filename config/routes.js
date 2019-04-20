const express = require('express');
const router = express.Router();
const { urlsController } = require('../app/controllers/urls_controller');
const { hashController } = require('../app/controllers/hashs_controller');

router.use('/urls', urlsController);
router.use('/', hashController);

module.exports = {
    routes: router
}