
const controller = {};
const usuarioModel = require('../models/usuarios');
const generarJwt = require('../utils/genererarJwt');



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

        const payload = { email: user.email };
        const token = generarJwt(payload);
        await user.save();

        // Enviar el token JWT como una cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Cambia a true si usas HTTPS en producción
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });

        res.status(200).json('Usuario creado exitosamente');

    } catch (error) {
        res.status(400).json({ error: error.message });
    };

};

controller.buscarUsuario = async (req, res) => {

    const { email } = req.body
    const usuario = await usuarioModel.findOne({ email: email }).select('nombre email _id').lean();//.lean(), para convertirlo en un objeto js, y sea mas rapido.

    res.status(200).json({ usuario })

    console.log(usuario);
};

controller.login = async (req, res) => {
    const { usuario, password } = req.body;

    const user = await usuarioModel.findOne({ usuario: usuario }).select('usuario password');

    if (user.usuario !== usuario && user.password !== password) {
        res.status(400).json('El usuario es invalido!.');
    } else if (user.password !== password) {
        res.status(400).json('La contraseña es invalida!.');
    };

    res.status(200).json({ user })

};


module.exports = controller;