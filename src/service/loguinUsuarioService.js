const generarJwt = require('../utils/generarJwt');
class LoguinUsuarioService {
    async validarUsuarioPassword (user, password, usuario) {
        //Verifico usuario y password
        if (user.usuario !== usuario || user.password !== password)throw new Error('Las credenciales son incorrectas');
        //Creo el payload
        const payload = { email: user.email };
        //Genero el token
        const token = generarJwt(payload);
        //Retorno el token
        return token;

    };
};

module.exports = new LoguinUsuarioService();
