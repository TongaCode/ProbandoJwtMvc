const usuarioModel = require('../models/usuarios');
const encriptarPassword = require('../utils/bcrypt')

class CrearUsuarioService {
    async crear(nombre, apellido, email, usuario, password) {
        //Encripto la password
        const passwordEncriptada = await encriptarPassword(password)
        const user = new usuarioModel({
            nombre,
            apellido,
            email,
            usuario,
            password: passwordEncriptada
        });

        return user;
    };
};

module.exports = new CrearUsuarioService();