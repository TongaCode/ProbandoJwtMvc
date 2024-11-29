const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controllers');
const { verifyToken } = require('../utils/genererarJwt');
const validarDatos = require('../middelware/validarDatos');
const validarBuscarUsuario = require('../middelware/validarBuscarUsuario');
const validarLogin = require('../middelware/validarLogin');
const verificarEmail = require('../middelware/verificarEmail');



router.post('/crearUsuario', validarDatos, verificarEmail, controller.crearUsuario);

router.get('/buscarUsuario',validarBuscarUsuario, controller.buscarUsuario);

router.post('/login',validarLogin, controller.login);

router.post('/logout');

router.get('/protected');

router.post('/trasferir');

router.post('/comprarDolares');

router.post('/venderDolares');

module.exports = router;