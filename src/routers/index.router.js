const express = require('express');
const router = express.Router();
const container = require('../container/container');// Contenedor para obtener el controlador.

//importo las Validaciones
const validarDatos = require('../middelware/validarDatos');
const validarBuscarUsuario = require('../middelware/validarBuscarUsuario');
const validarLogin = require('../middelware/validarLogin');
const verificarEmail = require('../middelware/verificarEmail');
const validarToken = require('../middelware/validarToken');
const validarCompraVenta = require('../middelware/validarCompraVenta');
const validarRemitenteTransferencia = require('../middelware/validarRemitenteTransferencia');
const validarExtraerDeposito = require('../middelware/validarExtraccionDeposito');

// Obtengo la instancia de los controladores
const crearUsuarioController = container.get('crearUsuarioController');
const buscarUsuarioController = container.get('buscarUsuarioController');
const loginUsuarioController = container.get('loginUsuarioController');
const protectedController = container.get('protectedController');
const transferirUsuarioController = container.get('transferirUsuarioController');
const compraDolarController = container.get('compraDolarController');
const venderDolarController = container.get('venderDolarController');
const extraccionController = container.get('extraccionController');
const depositoController = container.get('depositoController');
const logoutController = container.get('logoutController');


//Endpoinds con los controladores correspondientes.
router.get('/buscarUsuario', validarBuscarUsuario, buscarUsuarioController.buscarUsuario);

router.post('/crearUsuario', validarDatos, verificarEmail, crearUsuarioController.crearUsuario);

router.post('/login', validarLogin, loginUsuarioController.login);

router.get('/protected', validarToken, protectedController.protected);

router.post('/transferir', validarToken, validarRemitenteTransferencia, transferirUsuarioController.transferir);

router.post('/compraDolar', validarToken, validarCompraVenta, compraDolarController.compraDolar);

router.post('/ventaDolar', validarToken, validarCompraVenta, venderDolarController.venderDolar);

router.post('/extraccion', validarToken, validarExtraerDeposito, extraccionController.extraccion);

router.post('/deposito', validarToken, validarExtraerDeposito, depositoController.deposito);

router.post('/logout', validarToken, logoutController.logout);

module.exports = router;