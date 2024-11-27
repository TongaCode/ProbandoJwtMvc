function validarBuscarUsuario(req, res, next) {

    const { email } = req.body;
    const errores = [];

    try {
        if (!email || email.trim().length === 0) {
            errores.push('El email es obligatorio');
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errores.push('El email no tiene un formato válido');
        }

        if (errores.length > 0) {
            return res.status(400).json(errores);
        }

    } catch (error) {
        return res.status(400).json({error: error.message})
    }

    next();
};

module.exports = validarBuscarUsuario;