require('dotenv').config();
const jwt = require('jsonwebtoken');

//Variable de entrono
const secret = process.env.SECRET;

//Funcion para generar el jwt.
const generarJwt = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: '15m' });//El token expira en 15 minutos.
};

module.exports = generarJwt;