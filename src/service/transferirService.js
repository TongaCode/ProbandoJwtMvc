const transferir = {};
const usuarioModel = require('../models/usuarios');
const validarFondos = require('./validarFondosService');

transferir.service = async (emisorEmail, numeroCuenta, moneda, monto) => {
    const emisor = await usuarioModel.findOne({ email: emisorEmail })
    const remitente = await usuarioModel.findOne({ numeroCuenta: numeroCuenta });

    if (!remitente) throw new Error('El numero de cuenta no existe!.')

    //Llamo al service de verificar fondos.
    validarFondos.service(emisor, moneda, monto);

    emisor[moneda] -= monto;
    remitente[moneda] += monto;

    await emisor.save();
    await remitente.save();

    return { message: 'Transferencia realizada!.' };
};

module.exports = transferir;