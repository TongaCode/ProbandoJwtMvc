
function validarFondosCompraVenta(user, operacion, moneda, monto, valorDolar) {
    const validar = valorDolar * monto;
    switch (operacion) {
        case 'venta':
            if (user[moneda] < monto) throw new Error(`No tienes fondos suficientes para '${operacion}' '${moneda}'`);
            return true;
        case 'compra':
            if (user.peso < validar) throw new Error(`No tienes fondos suficientes para '${operacion}' '${moneda}'`);
            return true;
        default:
            throw new Error(`Error al validar los fondo: ${operacion}, Detalles ${error.message}`);
    }
};

function validarFondos(user, operacion, moneda, monto) {
    if (user[moneda] < monto) throw new Error(`No tiene fondos para realizar la operacion; ${operacion}!.`);
    return true;
};
module.exports = validarFondos, validarFondosCompraVenta;