const usuarioModel = require('../models/usuarios');

class CrearUsuarioService {
    crear(nombre, apellido, email, usuario, password) {
        const user = new usuarioModel({
            nombre,
            apellido,
            email,
            usuario,
            password
        });

        return user;
    };
};

module.exports = new CrearUsuarioService();