const controller = {};
const usuarioModel = require('../models/usuarios');
const TransferenciaService = require('../service/transferirService');
const UsuarioRepository = require('../repositories/usuarioRepository');
const CrearUsuarioService = require('../service/crearUsuarioService');
const LoguinUsuarioService = require('../service/loguinUsuarioService');

controller.crearUsuario = async (req, res) => {
    const { nombre, apellido, email, usuario, password } = req.body;
    try {
        //LLamo al service.
        const user = await CrearUsuarioService.crear(nombre, apellido, email, usuario, password);
        //LLamo al repository.
        await UsuarioRepository.userSave(user);
        res.status(200).json('Usuario creado exitosamente');
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

controller.buscarUsuario = async (req, res) => {

    const { email } = req.body;

    try {
        //LLamo al repository
        const usuario = await UsuarioRepository.findByEmail(email);

        return res.status(200).json({ usuario });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};

controller.login = async (req, res) => {
    const { usuario, password, email } = req.body;
    try {
        //LLamo al repository
        const user = await UsuarioRepository.findByEmail(email);
        //LLamo al service login
        const token = await LoguinUsuarioService.validarUsuarioPassword(user, usuario, password);
        // Enviar el token JWT como una cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Habilitar secure en producción
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });
        return res.status(200).json({ message: 'Bienvenido' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

controller.protected = async (req, res) => {
    const { email } = req.user
    const usuario = await usuarioModel.findOne({ email: email });
    return res.status(200).json(`'${usuario.usuario}' Usted tiene acceso a la ruta protegida!.`)
};

controller.transferir = async (req, res) => {
    try {
        //Guardo email del usuario logeado para posterior
        const email = req.user.email;
        const { numeroCuenta, moneda, monto } = req.body;

        //Llamo al Service transferir
        const resultado = await TransferenciaService.transferir(email, numeroCuenta, moneda, monto);
        return res.status(200).json(resultado)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

module.exports = controller;