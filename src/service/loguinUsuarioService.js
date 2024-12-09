const generarJwt = require('../utils/generarJwt');
const bcrypt = require('bcrypt');
class LoguinUsuarioService {
    async validarUsuarioPassword(user, usuario, password) {
        //Verifico usuario y password
        const validar = await bcrypt.compare(password, user.password);
        if (!validar) throw new Error ('Las credenciales son incorrectas!.');
        //Creo el payload
        const payload = { email: user.email };
        //Genero el token
        const token = generarJwt(payload);
        //Retorno el token
        return token;
    };
};
module.exports = new LoguinUsuarioService();
