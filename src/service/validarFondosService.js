const validarFondos = {};

validarFondos.service = (emisor, moneda, monto) => {
    if (emisor[moneda] < monto) throw new Error('No tienes fondos suficientes!.');
    
    return true;
};

module.exports = validarFondos;