
async function validarUsuario(req, res, next) {

    try {
        const buscarUsuario = await usuarioModel.findOne({ email: email }); // Comprobar si existe el usuario primero.

        if (buscarUsuario) {
            return res.status(400).json('El usuario ya existe');
        }

        next();

    } catch (error) {
        return res.status(400).json({ error: message.error });
    }

};

module.exports = validarUsuario;
