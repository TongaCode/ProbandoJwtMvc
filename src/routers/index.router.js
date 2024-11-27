const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controllers');
const { verifyToken } = require('../utils/genererarJwt');
const validarUsuario = require('../middelware/validarUsuario');
const validarDatos = require('../middelware/validarDatos');



router.post('/crearUsuario', validarDatos,  validarUsuario, controller.crearUsuario);

router.get('/buscarUsuario', controller.buscarUsuario);

router.post('/login',controller.login);

router.post('/logout');

router.get('/protected');

router.post('/trasferir');

router.post('/comprarDolares');

router.post('/venderDolares');

module.exports = router;