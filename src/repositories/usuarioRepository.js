const usuarioModel = require('../models/usuarios');

class UsuarioRepository {
    async findByEmail(email) {
        const resultado = await usuarioModel.findOne({ email: email });

        if (!resultado) throw new Error('El usuario no existe!.');

        return resultado;

    };

    async findByNumeroDeCuenta(numeroCuenta) {
        const resultado = await usuarioModel.findOne({ numeroCuenta: numeroCuenta });

        if (!resultado) throw new Error('El numero de cuenta no existe!.');

        return resultado;

    };

    async emisorSave(emisor) {
        await emisor.save();
        return true;
    };

    async receptorSave(receptor) {
        await receptor.save();
        return true;
    };
};

module.exports = new UsuarioRepository();