const usuarioRepository = require("../repositories/usuarioRepository");
const {validarFondos} = require('../utils/validarFondos');

class extraccionDepositoService {
    async extraccionDeposito(email, operacion, moneda, monto) {
        //Llamo al repository
        const user = await usuarioRepository.findByEmail(email);
        switch (operacion) {
            case 'extraccion':
                //Llamo para validar fondos
                validarFondos(user, moneda, monto);
                user[moneda] -= monto
                //Llamo al repository user para guardar cambios usuario
                await usuarioRepository.userSave(user);
                return user;
            case 'deposito':
                user[moneda] += monto
                //Llamo al repository user para guardar cambios usuario
                await usuarioRepository.userSave(user);
                return user;
            default:
                throw new Error(`Error al realizar la operacion: ${operacion}!.`);
        };
    };
};
module.exports = new extraccionDepositoService();