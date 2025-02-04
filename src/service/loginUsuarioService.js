const generarJwt = require('../utils/generarJwt');
const OperacionesService = require('./OperacionesService');
const bcrypt = require('bcrypt');

class LoginUsuarioService extends OperacionesService {
    constructor(UsuarioRepository) {
        super(UsuarioRepository);
    };

    async ejecutar(usuario, password, email)  {
    //Llamo al repository para buscar al usuario
    const user = await this.UsuarioRepository.findByEmail(email);
    const validar = await bcrypt.compare(password, user.password);

    if (!validar || usuario !== user.usuario) throw new Error('Las credenciales son incorrectas!.');
    //Creo el payload
    const payload = { email: user.email };
    //Genero el token
    const token = generarJwt(payload);
    //Retorno el token
    return token;
};
};
module.exports = LoginUsuarioService;
