const controller = {};
const transferir = require('../service/transferirService')
const usuarioModel = require('../models/usuarios');
const generarJwt = require('../utils/generarJwt');



controller.crearUsuario = async (req, res) => {

    try {

        const { nombre, apellido, email, usuario, password } = req.body;

        const user = new usuarioModel({
            nombre,
            apellido,
            email,
            usuario,
            password
        });

        await user.save();

        res.status(200).json('Usuario creado exitosamente');

    } catch (error) {
        res.status(400).json({ error: error.message });
    };

};

controller.buscarUsuario = async (req, res) => {

    const { email } = req.body;

    try {
        const usuario = await usuarioModel.findOne({ email: email });

        if (!usuario) {
            return res.status(400).json('El usuario no existe!')
        }

        return res.status(200).json({ usuario });


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};

controller.login = async (req, res) => {
    const { usuario, password, email } = req.body;

    try {

        const user = await usuarioModel.findOne({ email: email }).select('usuario password email');

        if (!user) {
            return res.status(400).json('El usuario no existe');
        }

        if (user.usuario !== usuario || user.password !== password) {
            return res.status(400).json('Las credenciales son incorrectas');
        }

        const payload = { email: user.email };

        const token = generarJwt(payload);

        // Enviar el token JWT como una cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Habilitar secure en producción
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });

        return res.status(200).json({ message: 'Bienvenido' });

    } catch (error) {

        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

controller.protected = async (req, res) => {

    const { email } = req.user
    const usuario = await usuarioModel.findOne({ email: email });
    return res.status(200).json(`'${usuario.usuario}' Usted tiene acceso a la ruta protegida!.`)
};

controller.transferir = async (req, res) => {
    try {
        const emisorEmail = req.user.email;
        const { numeroCuenta, moneda, monto } = req.body;
        //Llamo al Service transferir
        const resultado = await transferir.service(emisorEmail, numeroCuenta, moneda, monto);
        return res.status(200).json(resultado)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

module.exports = controller;