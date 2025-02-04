
function validarFondosCompraVenta(user, operacion, monto, valorDolar) {
    const validar = valorDolar * monto;

    switch (operacion) {
        case 'venta':
            if (user.dolar < monto) throw new Error(`No tienes fondos suficientes para vender dolares.`);

            return true;
        case 'compra':
            if (user.peso < validar) throw new Error(`No tienes fondos suficientes para comprar ${monto} dolares.`);

            return true;
        default:
            throw new Error(`Error al validar los fondo: ${operacion}!.`);
    };
};

function validarFondos(user, moneda, monto) {

    if (user[moneda] < monto) throw new Error(`No tiene fondos!`);

    return true;
};
module.exports = { validarFondosCompraVenta, validarFondos };