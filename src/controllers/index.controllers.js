const controller = {}
const usuarioModel = require('../models/usuarios')
const TransferenciaService = require('../service/transferirService')
const UsuarioRepository = require('../repositories/usuarioRepository')
const CrearUsuarioService = require('../service/crearUsuarioService')
const LoginUsuarioService = require('../service/loginUsuarioService')
const CompraVentaService = require('../service/compraVentaService');
const extracccionDepositoService = require('../service/extracccionDepositoService')

controller.crearUsuario = async (req, res) => {
    const { nombre, apellido, email, usuario, password } = req.body
    try {
        //LLamo al service.
        const user = await CrearUsuarioService.crear(nombre, apellido, email, usuario, password)
        //LLamo al repository.
        await UsuarioRepository.userSave(user)
        res.status(200).json('Usuario creado exitosamente')
    } catch (error) {
        res.status(400).json({ error: error.message })
    };
};
controller.buscarUsuario = async (req, res) => {
    const { email } = req.body
    try {
        //LLamo al repository
        const usuario = await UsuarioRepository.findByEmail(email)
        return res.status(200).json({ usuario })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};
controller.login = async (req, res) => {
    const { usuario, password, email } = req.body
    try {
        //LLamo al repository
        const user = await UsuarioRepository.findByEmail(email)
        //LLamo al service login
        const token = await LoginUsuarioService.validarUsuarioPassword(user, usuario, password)
        // Enviar el token JWT como una cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Habilitar secure en producción
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });
        return res.status(200).json({ message: `Bienvenido ${user.usuario}` })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};
controller.protected = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await usuarioModel.findOne({ email: email });
        return res.status(200).json({
            message: "¡Acceso concedido a la ruta protegida!",
            usuario: user.usuario,
            detalles: {
                email: user.email,
                nombre: user.nombre,
                peso: user.peso,
                dolar: user.dolar
            },
        });
    } catch (error) {
        return res.status(500).json({ error: "Error del servidor", details: error.message });
    }
};
controller.transferir = async (req, res) => {
    try {
        //Guardo email del usuario logeado para posterior
        const email = req.user.email
        const { numeroCuenta, moneda, monto } = req.body;
        //Llamo al Service transferir
        const resultado = await TransferenciaService.transferir(email, numeroCuenta, moneda, monto)
        return res.status(200).json(resultado)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};
controller.compraVenta = async (req, res) => {
    try {
        const { operacion, moneda, monto } = req.body;
        const { email } = req.user;
        //LLamo al service
        const user = await CompraVentaService.compraVenta(email, operacion, moneda, monto);
        //Llamo al repositori
        await UsuarioRepository.userSave(user);
        return res.status(200).json('Operacion exitosa!');
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};
controller.extraccionDeposito = async (req, res) => {
    const { operacion, moneda, monto } = req.body;
    const { email } = req.user;
    try {
        //Llamo al service
        const user = await extracccionDepositoService.extraccionDeposito(email, operacion, moneda, monto);
        res.status(200).json(`${operacion} exitosa!, ${moneda}: ${user[moneda]}`);
    } catch (error) {
        res.status(400).json({ erorr: error.message });
    }
};
controller.logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/' // Debe coincidir con el path usado en res.cookie o si no use ninguno por defoult lo hace en todas
    });
    return res.status(200).json({ message: 'Logout exitoso' });
};

module.exports = controller;