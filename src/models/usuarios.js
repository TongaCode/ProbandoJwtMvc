const mongoose = require('mongoose');
const generarNumeroCuenta = require('../utils/generarNumeroDeCuenta');


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
    },
    peso: {
        type: Number, default: 10000, require: true

    },

    dolar: {
        type: Number, default: 10000, require: true

    },
    numeroCuenta: {
        type: String, unique: true, require: true

    }


}, { versionKey: false });

// Hook para asignar el número de cuenta al usuario
usuarioSchema.pre('save', function (next) {

    if (!this.numeroCuenta) {
        this.numeroCuenta = generarNumeroCuenta();
    };
    
    next();
});

const usuarioModel = mongoose.model('usuarios', usuarioSchema);

module.exports = usuarioModel;