class OperacionesService {
    constructor(UsuarioRepository) {
        this.UsuarioRepository = UsuarioRepository;
    };

    async ejecutar(email) {
        throw new Error(`Metodo ejecutar no implementado.`);
    };
};

module.exports = OperacionesService;