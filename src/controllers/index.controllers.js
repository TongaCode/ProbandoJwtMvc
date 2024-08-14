
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
        res.status(400).json({error: 'no llega el mensaje'});
    };

};


module.exports = controller;