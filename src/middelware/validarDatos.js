function validarDatos(req, res) {
    const { nombre, apellido, email, usuario, password } = req.body;
    const errores = [];

    if (!nombre || nombre.trim().length === 0) {
        errores.push('El nombre es obligatorio');
    } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
        errores.push('El nombre solo puede contener letras');
    }

    if (!apellido || apellido.trim().length === 0) {
        errores.push('El apellido es obligatorio');
    } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellido)) {
        errores.push('El apellido solo puede contener letras');
    }

    if (!email || email.trim().length === 0) {
        errores.push('El email es obligatorio');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errores.push('El email no tiene un formato válido');
    }

    if (!usuario || usuario.trim().length === 0) {
        errores.push('El usuario es obligatorio');
    } else if (usuario.length < 4 || usuario.length > 20) {
        errores.push('El usuario debe tener entre 4 y 20 caracteres');
    }

    if (!password || password.trim().length === 0) {
        errores.push('La contraseña es obligatoria');
    } else if (password.length < 6) {
        errores.push('La contraseña debe tener al menos 6 caracteres');
    }

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    next();

};

module.exports = validarDatos;