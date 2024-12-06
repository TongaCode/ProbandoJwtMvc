const validarFondos = require('../middelware/validarFondos');
const UsuarioRepository = require('../repositories/usuarioRepository');

class TransferenciaService {
    async transferir(email, numeroCuenta, moneda, monto) {
        try {
            //Llamo al repository
            const user = await UsuarioRepository.findByEmail(email);
            const receptor = await UsuarioRepository.findByNumeroDeCuenta(numeroCuenta);
            //Middelware validar fondos
            validarFondos(emisor, moneda, monto);
            //Realizo la operacion
            emisor[moneda] -= monto;
            receptor[moneda] += monto;
            //LLamo al repository para guardar
            await UsuarioRepository.emisorSave(user);
            await UsuarioRepository.receptorSave(receptor);

            return { message: 'Transferencia realizada con exito!' }

        } catch (error) {
            return { error: error.message }
        }

    };
};

module.exports = new TransferenciaService();