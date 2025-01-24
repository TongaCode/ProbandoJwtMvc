const { validarFondos } = require('../utils/validarFondos');
const OperacionesService = require('./OperacionesService');

class TransferirService extends OperacionesService {
    constructor(UsuarioRepository) {
        super(UsuarioRepository);
    };

    async ejecutar(email, numeroCuenta, moneda, monto) {

        try {
            //Llamo al repository
            const user = await this.UsuarioRepository.findByEmail(email);
            const receptor = await this.UsuarioRepository.findByNumeroDeCuenta(numeroCuenta);
            //Middelware validar fondos
            validarFondos(user, moneda, monto);
            //Realizo la operacion
            user[moneda] -= monto;
            receptor[moneda] += monto;
            //LLamo al repository para guardar
            await this.UsuarioRepository.userSave(user);
            await this.UsuarioRepository.receptorSave(receptor);

            return { message: 'Transferencia realizada con exito!' }

        } catch (error) {
            return { error: error.message }
        }
    };
};

module.exports = TransferirService;