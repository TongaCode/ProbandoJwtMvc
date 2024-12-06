function validarFondos(user, moneda, monto) {
    if (user[moneda] < monto) throw new Error('No tienes fondos suficientes!.');

    return true;
}

module.exports = validarFondos;