function validarExtraerDeposito(req, res, next) {
    const { moneda, monto } = req.body;
    const error = [];

    //Validar moneda peso o dolar
    const validarMoneda = ['dolar', 'peso'];

    if (monto <= 0) error.push(`No puede ingresar numeros negativos o igual a cero, monto ingresado: ${monto}`);

    if (!validarMoneda.includes(moneda)) error.push(`Debe introducir una moneda valida,  no '${moneda}'`);

    //Validar monto
    if (typeof monto != 'number' || isNaN(monto)) error.push(`Debe ingresar un numero valido, no '${monto}'`);

    //Valido que los parametros no esten vacios
    if (!moneda || monto === undefined) error.push('Los parametros no pueden estar vacio');

    if (error.length > 0) return res.status(400).json({ error: error });

    next();
};
module.exports = validarExtraerDeposito;