const usuarioModel = require("../models/usuarios");

async function verificarEmail(req, res, next) {

    const { email } = req.body;
    const verificar = await usuarioModel.findOne({ email: email });

    if (verificar) {
        return res.status(400).json('El email ya existe!.');
    }
    
    next();
};

module.exports = verificarEmail;