const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controllers');

router.get('/login', controller.index);

router.post('/trasferencia');

router.post('/deposito');

router.post('/comprarDolares');

router.post('/venderDolares');

module.exports = router;