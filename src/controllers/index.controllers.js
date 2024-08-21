
const controller = {};
const usuarioModel = require('../models/usuarios');

controller.index = (req, res) => {
    res.send('hola desde el index.controller')
};

controller.crearUsuario = async (req, res) => {

    try {

        const { nombre, apellido, email, password } = req.body;
        const usuario = new usuarioModel({
            nombre,
            apellido,
            email,
            password
        });

        const resultado = await usuario.save();
        console.log(resultado);

        res.status(200).json(resultado);

    } catch (error) {
        res.status(400).json({error: 'No se pudo crear el usuario'});
    };

};

controller.buscarUsuario = async (req, res) => {

    const {email} = req.body
    const usuario = await usuarioModel.findOne({email: email}).select('nombre email _id').lean();//.lean(), para convertirlo en un objeto js, y sea mas rapido.

    res.status(200).json({usuario})

    console.log(usuario);
};


module.exports = controller;