const {validarFondos} = require('../utils/validarFondos');
const OperacionesService = require('./OperacionesService');

class ExtraccionDepositoService extends OperacionesService {
    constructor(UsuarioRepository, operacion){
        super(UsuarioRepository,{operacion});
        this.operacion = operacion;
    };

    async ejecutar(email, moneda, monto) {
        //Llamo al repository para buscar el usuario
        const user = await this.UsuarioRepository.findByEmail(email);

        switch (this.operacion) {

            case 'extraccion':
                //Llamo para validar fondos
                validarFondos(user, moneda, monto);
                user[moneda] -= monto
                //Llamo al repository user para guardar cambios usuario
                await this.UsuarioRepository.userSave(user);

                return user;

            case 'deposito':
                user[moneda] += monto
                //Llamo al repository user para guardar cambios usuario
                await this.UsuarioRepository.userSave(user);

                return user;
            default:
                throw new Error(`Error al realizar la operacion: ${this.operacion}!.`);
        };
    };
};
module.exports = ExtraccionDepositoService;