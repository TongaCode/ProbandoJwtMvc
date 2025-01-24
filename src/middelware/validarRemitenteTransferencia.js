async function validarRemitenteTransferencia(req, res, next) {
    const monedasPermitidas = ["peso", "dolar"];
    const { numeroCuenta, moneda, monto } = req.body;
    const errores = [];

    // Validar número de cuenta
    if (!numeroCuenta || !/^\d+$/.test(numeroCuenta)) {
        errores.push('El número de cuenta es obligatorio y debe contener solo números.');
    };

    // Validar moneda
    if (!moneda || !monedasPermitidas.includes(moneda.toLowerCase())) {
        errores.push(`La moneda es obligatoria y debe ser una de las siguientes 'peso' ó 'dolar'`);
    };

    // Validar monto
    if (!monto || typeof monto !== "number" || monto <= 0) {
        errores.push('El monto es obligatorio, debe ser un número positivo.');
    };

    if (errores.length > 0) {
        return res.status(400).json({ error: errores });
    };

    next();
};

module.exports = validarRemitenteTransferencia;