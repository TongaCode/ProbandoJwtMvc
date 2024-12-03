function validarLogin(req, res, next) {

    const { usuario, password, email } = req.body;
    const errores = [];

    if (!usuario || typeof usuario !== 'string' || usuario.trim().length === 0) {
        errores.push('El campo "usuario" es obligatorio y debe ser un texto válido.');
    }
    if (!password || typeof password !== 'string' || password.trim().length === 0) {
        errores.push('El campo "password" es obligatorio y debe ser un texto válido.');
    } else if (password.length < 6) {
        errores.push('El campo password debe tener al menos 6 caracteres.');
    }
    if (!email || email.trim().length === 0) {
        errores.push('El email es obligatorio');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errores.push('El email no tiene un formato valido');
    }

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    next();
};

module.exports = validarLogin;