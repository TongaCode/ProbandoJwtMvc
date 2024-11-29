
const controller = {};
const usuarioModel = require('../models/usuarios');
const { generateToken, verifyToken } = require('../utils/genererarJwt');



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

    const {email} = req.body;

    try {
        const usuario = await usuarioModel.findOne({ email: email });

        if (usuario === null) {
            return res.status(400).json('El usuario no existe!')
        }

        return res.status(200).json({usuario});

        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};

controller.login = async (req, res) => {
    const {usuario, password}= req.body;
    
    try {
        // Buscar al usuario en la base de datos
        const user = await usuarioModel.findOne({ usuario }).select('usuario password email');
        console.log(user)
        // Si el usuario no existe
        if (!user || user == null) {
            return res.status(400).json('El usuario no existe');
        }
        
        if (user.usuario !== usuario || user.password !== password) {
            return res.status(400).json('Las credenciales son incorrectas');
        }

        // Generar el payload con el email del usuario
        const payload = { email: user.email };

        // Generar el token JWT
        const token = generateToken(payload);

        // Enviar el token JWT como una cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Habilitar secure en producción
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });

        // Responder con éxito
        return res.status(200).json({ message: 'Bienvenido' });

    } catch (error) {

        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = controller;