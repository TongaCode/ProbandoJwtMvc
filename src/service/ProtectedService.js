const OperacionesService = require('./OperacionesService');

class ProtectedService extends OperacionesService {
    constructor(UsuarioRepository) {
        super(UsuarioRepository);
    };

    async ejecutar(email) {
        const user = await this.UsuarioRepository.findByEmail(email);

        return user;
    };
};

module.exports = ProtectedService;