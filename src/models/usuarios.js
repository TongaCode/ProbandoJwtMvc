const mongoose = require('mongoose');


const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String, require: true
    },
    apellido: {
        type: String, require: true
    },
    email: {
        type: String, require: true
    },

    usuario: {
        type: String, require: true
    },
    password: {
        type: String, require: true
    }


}, { versionKey: false });

const usuarioModel = mongoose.model('usuarios', usuarioSchema);

module.exports = usuarioModel;