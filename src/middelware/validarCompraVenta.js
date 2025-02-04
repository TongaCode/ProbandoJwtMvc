function validarCompraVenta(req, res, next) {
    const { monto } = req.body;
    const error = [];

    //Validar monto
    if (typeof monto != 'number' || isNaN(monto)) error.push(`Debe ingresar un numero valido, no '${monto}'`);

    //Valido que los parametros no esten vacios
    if (monto === undefined) error.push('Los parametros no pueden estar vacio');

    if (error.length > 0) return res.status(400).json(error);

    next();
}
module.exports = validarCompraVenta;