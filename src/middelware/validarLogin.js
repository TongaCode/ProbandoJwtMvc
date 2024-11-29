function validarLogin(req, res, next) {

    const { usuario, password } = req.body;
    const errores = [];

    // Validar que el campo "usuario" no esté vacío
    if (!usuario || typeof usuario !== 'string' || usuario.trim().length === 0) {
        errores.push('El campo "usuario" es obligatorio y debe ser un texto válido.');
    }

    // Validar que el campo "password" no esté vacío
    if (!password || typeof password !== 'string' || password.trim().length === 0) {
        errores.push('El campo "password" es obligatorio y debe ser un texto válido.');
    } else if (password.length < 6) {
        // Validar longitud mínima de la contraseña
        errores.push('El campo password debe tener al menos 6 caracteres.');
    }

    // Si hay errores, retornar con un estado 400
    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    // Si todo es válido, continuar con el siguiente middleware/controlador
    next();
};

module.exports = validarLogin;