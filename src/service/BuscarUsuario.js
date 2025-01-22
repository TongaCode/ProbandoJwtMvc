const OperacionesService = require('./OperacionesService');

class BuscarUsuario extends OperacionesService {
    constructor(UsuarioRepository) {
        super(UsuarioRepository);
    };
    async ejecutar(email){
        const user =  await this.UsuarioRepository.findByEmail(email);
        return user;
    };
};

module.exports = BuscarUsuario;