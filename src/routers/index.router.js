const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controllers');
const validarDatos = require('../middelware/validarDatos');
const validarBuscarUsuario = require('../middelware/validarBuscarUsuario');
const validarLogin = require('../middelware/validarLogin');
const verificarEmail = require('../middelware/verificarEmail');
const validarToken = require('../middelware/validarToken');
const validarCompraVenta = require('../middelware/validarCompraVenta');
const validarRemitenteTransferencia = require('../middelware/validarRemitenteTransferencia');
const validarExtraerDeposito = require('../middelware/validarExtraccionDeposito');

router.get('/buscarUsuario',validarBuscarUsuario, controller.buscarUsuario);

router.post('/crearUsuario', validarDatos, verificarEmail, controller.crearUsuario);

router.post('/login',validarLogin, controller.login);

router.get('/protected',validarToken, controller.protected);

router.post('/transferir',validarToken, validarRemitenteTransferencia, controller.transferir);

router.post('/compraDolar', validarToken, validarCompraVenta, controller.compraDolar);

router.post('/ventaDolar', validarToken, validarCompraVenta, controller.ventaDolar);

router.post('/extraccion', validarToken, controller.extraccion);

router.post('/deposito', validarToken, controller.deposito);

router.post('/logout',validarToken, controller.logout);

module.exports = router;