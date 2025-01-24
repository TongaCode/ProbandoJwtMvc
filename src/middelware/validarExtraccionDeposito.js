function validarExtraerDeposito(req, res, next) {
    const { operacion, moneda, monto } = req.body;
    const operacionValida = ['extraccion', 'deposito'];
    const error = [];

    if (!operacionValida.includes(operacion)) error.push(`La operacion debe ser "extraccion" ó "deposito", no '${operacion}.'`);

    //Validar moneda peso o dolar
    const validarMoneda = ['dolar', 'peso'];
    if (!validarMoneda.includes(moneda)) error.push(`Debe introducir una moneda valida,  no '${moneda}'`);

    //Validar monto
    if (typeof monto != 'number' || isNaN(monto)) error.push(`Debe ingresar un numero valido, no '${monto}'`);

    //Valido que los parametros no esten vacios
    if (!operacion || !moneda || monto === undefined) error.push('Los parametros no pueden estar vacio');

    if (error.length > 0) return res.status(400).json({ error: error });

    next();
};
module.exports = validarExtraerDeposito;