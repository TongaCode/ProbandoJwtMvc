const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controllers');
const validarDatos = require('../middelware/validarDatos');
const validarBuscarUsuario = require('../middelware/validarBuscarUsuario');
const validarLogin = require('../middelware/validarLogin');
const verificarEmail = require('../middelware/verificarEmail');
const validarToken = require('../middelware/validarToken');
const validarRemitenteTransferencia = require('../middelware/validarRemitenteTransferencia');



router.post('/crearUsuario', validarDatos, verificarEmail, controller.crearUsuario);

router.get('/buscarUsuario',validarBuscarUsuario, controller.buscarUsuario);

router.post('/login',validarLogin, controller.login);

router.post('/logout');

router.get('/protected',validarToken, controller.protected);

router.post('/transferir',validarToken, validarRemitenteTransferencia, controller.transferir);

router.post('/comprarDolares', validarToken);

router.post('/venderDolares', validarToken);

module.exports = router;