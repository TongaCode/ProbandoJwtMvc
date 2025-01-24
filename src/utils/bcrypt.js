const bcrypt = require('bcrypt');
//Encriptar password
async function encriptarPassword(password) {

    const saltRounds = 10;
    const passwordEncriptada = await bcrypt.hash(password, saltRounds);

    return passwordEncriptada;
};

//Validar password
async function validarPassword(passwordIngresada, passwordEncriptada) {

    const validar = await bcrypt.compare(passwordIngresada, passwordEncriptada);

    return validar;
};

module.exports = encriptarPassword, validarPassword;