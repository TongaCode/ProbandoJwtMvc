const OperacionesService = require('./OperacionesService');

class BuscarUsuarioService extends OperacionesService {
    constructor(UsuarioRepository) {
        super(UsuarioRepository);
    };

    async ejecutar(email) {
        const user = await this.UsuarioRepository.findByEmail(email);

        return user;
    };
};

module.exports = BuscarUsuarioService;