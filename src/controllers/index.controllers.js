
const controller = {};
const usuarioModel = require('../models/usuarios');
const { generateToken, verifyToken } = require('../utils/genererarJwt');



controller.crearUsuario = async (req, res) => {

    try {

        const { nombre, apellido, email, usuario, password } = req.body;

        const buscarUsuario = await usuarioModel.findOne({ email: email }); // Comprobar si existe el usuario primero.

        if (buscarUsuario) {
            return res.status(400).json('El usuario ya existe');
        }

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

    const { email } = req.body
    
    if (!email) {
        return res.status(400).json({ message: 'El email esta vacio' })

    }
    const usuario = await usuarioModel.findOne({ email: email })

    if (usuario === null) {
        return res.status(400).json({error: 'el usuario no existe'})
    }

    
        
    return res.status(200).json(usuario)
    



};

controller.login = async (req, res) => {

    try {
        const { usuario, password } = req.body;

        const user = await usuarioModel.findOne({ usuario: usuario }).select('usuario password email');

        if (!user) {
            throw new Error('El usuario no existe!.');
        };

        if (user.password !== password) {
            throw new Error('La contraseña es invalida!.');
        };

        //Genero el payload con el mail del usuario.
        const payload = { email: user.email };
        const token = generateToken(payload);

        // Enviar el token JWT como una cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Cambia a true si usas HTTPS en producción
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });



        res.status(200).json({ message: 'bienvenido' })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

};

module.exports = controller;