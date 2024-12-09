const usuarioModel = require('../models/usuarios');

class UsuarioRepository {
    async findByEmail(email) {
        const user = await usuarioModel.findOne({ email: email });

        if (!user) throw new Error('El usuario no existe!.');

        return user;

    };

    async findByNumeroDeCuenta(numeroCuenta) {
        const resultado = await usuarioModel.findOne({ numeroCuenta: numeroCuenta });

        if (!resultado) throw new Error('El numero de cuenta no existe!.');

        return resultado;

    };

    async userSave(user) {
        await user.save();
        return true;
    };

    async receptorSave(receptor) {
        await receptor.save();
        return true;
    };
};

module.exports = new UsuarioRepository();