const usuarioModel = require('../models/usuarios');
const encriptarPassword = require('../utils/bcrypt');
const OperacionesService = require('./OperacionesService');

class CrearUsuarioService extends OperacionesService {
    constructor(UsuarioRepository){
    super(UsuarioRepository);
    };

    async ejecutar(nombre, apellido, email, usuario, password) {
        //Encripto la password
        const passwordEncriptada = await encriptarPassword(password);
        const user = new usuarioModel({
            nombre,
            apellido,
            email,
            usuario,
            password: passwordEncriptada
        });
        
        await this.UsuarioRepository.userSave(user);

        return user;
    };
};

module.exports = CrearUsuarioService;