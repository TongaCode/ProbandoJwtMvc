const usuarioModel = require('../models/usuarios');

class UsuarioRepository {

    async findByEmail(email) {
        try {
            const user = await usuarioModel.findOne({ email: email });

            if (!user) throw new Error('El usuario no existe!.');

            return user;
        } catch (error) {
            throw new Error(`Error al buscar usuario: ${email}, Detalles: ${error.message}`);
        }
    };

    async findByNumeroDeCuenta(numeroCuenta) {
        try {
            const resultado = await usuarioModel.findOne({ numeroCuenta: numeroCuenta });

            if (!resultado) throw new Error('El numero de cuenta no existe!.');

            return resultado;
        } catch (error) {
            throw new Error(`Error al buscar numero de cuenta: ${numeroCuenta}, Detalles: ${error.message} `);
        }
    };

    async userSave(user) {
        try {
            await user.save();

            return true;
        } catch (error) {
            throw new Error(`Error al guardar usuario ${user}, Detalles ${error.message}`);
        }
    };

    async receptorSave(receptor) {
        try {
            await receptor.save();

            return true;
        } catch (error) {
            throw new Error(`Error al guardar destinatario: ${receptor}, Detalles ${error.message}`);
        }
    };
};

module.exports =  UsuarioRepository;