const jwt = require('jsonwebtoken');

function validarToken(req, res, next) {
    try {
        // Obtener el token desde las cookies, los encabezados o el cuerpo de la solicitud
        const token = req.cookies.token;
        // Si no hay token, devolver un error
        if (!token) {
            return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
        };
        // Verificar el token
        const decoded = jwt.verify(token, process.env.SECRET);
        // Adjuntar la información decodificada al objeto `req` para usarlo
        //devuelve email para despues traer en el controlador al usuario con el email.
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
};

module.exports = validarToken;