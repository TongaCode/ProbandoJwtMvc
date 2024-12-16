const usuarioRepository = require("../repositories/usuarioRepository");
const validarFondosCompraVenta = require('../utils/validarFondos');

class CompraVentaService {
    async compraVenta(email, operacion, moneda, monto) {
        //LLamo al repository
        const user = await usuarioRepository.findByEmail(email);
        const valorDolar = 1000; //Voy a realizar un repositori a una api externa posteriormente
        //Verifico los fondos
        await validarFondosCompraVenta(user, operacion, moneda, monto, valorDolar);
        switch (operacion) {
            case 'compra':
                user[moneda] += monto;
                user.peso -= monto * valorDolar;
                return user;
            case 'venta':
                user[moneda] -= monto;
                user.peso += monto * valorDolar;
                return user;
            default:
                throw new Error(`Error al realizar la operacion ${operacion}, Detalles ${error.message}`);
        }
    };
};
module.exports = new CompraVentaService();