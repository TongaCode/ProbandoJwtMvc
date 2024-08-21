const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controllers');

router.post('/crearUsuario', controller.crearUsuario);

router.post('/login', controller.index);

router.post('/logout');

router.get('protected');

router.get('/buscarUsuario', controller.buscarUsuario);

router.post('/trasferir')

router.post('/comprarDolares');

router.post('/venderDolares');

module.exports = router;