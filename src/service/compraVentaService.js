const { validarFondosCompraVenta } = require('../utils/validarFondos');
const OperacionesService = require("./OperacionesService");

class CompraVentaDolarService extends OperacionesService {
    constructor(UsuarioRepository, operacion) {
        super(UsuarioRepository, { operacion });
        this.operacion = operacion;
    };

    async ejecutar(email, monto) {
        //LLamo al repository
        const user = await this.UsuarioRepository.findByEmail(email);
        const valorDolar = 1000; //Voy a realizar un repositori a una api externa posteriormente
        //Verifico los fondos
        validarFondosCompraVenta(user, this.operacion, monto, valorDolar);

        switch (this.operacion) {
            case 'compra':
                user.dolar += monto;
                user.peso -= monto * valorDolar;
                await this.UsuarioRepository.userSave(user);
                return user;

            case 'venta':
                user.dolar -= monto;
                user.peso += monto * valorDolar;
                await this.UsuarioRepository.userSave(user);
                return user;

            default:
                throw new Error(`Error al realizar la operacion ${this.operacion}, Detalles ${error.message}`);
        };
    };
};
module.exports = CompraVentaDolarService;