require('dotenv').config();
const jwt = require('jsonwebtoken');

//Variable de entrono
const secret = process.env.SECRET;

//Funcion para generar el jwt.
const generateToken = (payload) => {

    return jwt.sign(payload, secret, { expiresIn: '1d' });//El token expira en 1 dia.
};

//Validar jwt.
const verifyToken = (token) => {

    try {
        const decode = jwt.veryfi({ token, secret });
        return decode;

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            console.error('El token expiro!.');
        };

        if (error.name === 'JsonWebTokenError') {
            console.error('El token es invalido!.');
        } else {
            console.error('Error al verificar el token!.');
        };
        return null;
    };

};

module.exports = { generateToken, verifyToken };