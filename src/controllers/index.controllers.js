const controller = {}
const usuarioModel = require('../models/usuarios')
const TransferenciaService = require('../service/TransferirService')
const CrearUsuarioService = require('../service/CrearUsuarioService')
const LoginUsuarioService = require('../service/LoginUsuarioService')
const ExtraccionDepositoService = require('../service/ExtracccionDepositoService')
const UsuarioRepository = require('../repositories/UsuarioRepository')
const CompraVentaDolarService = require('../service/CompraVentaService')
const BuscarUsuario = require('../service/BuscarUsuario')

controller.crearUsuario = async (req, res) => {
    const { nombre, apellido, email, usuario, password } = req.body
    try {
        //Creo la instancia del servicio e inyecto el Repositorio.
        const crearUsuarioService = new CrearUsuarioService(UsuarioRepository);
        const user = await crearUsuarioService.ejecutar(nombre, apellido, email, usuario, password)
        //LLamo al repository.
        res.status(200).json(`Usuario creado exitosamente, Nombre: ${user.nombre} , Apellido: ${user.apellido} , Email: ${user.email}`)
    } catch (error) {
        res.status(400).json({ error: error.message })
    };
};
controller.buscarUsuario = async (req, res) => {
    const { email } = req.body
    try {
        //Creo la instancia del servicio e inyecto el Repositorio.
        const buscarUsuarioService = new BuscarUsuario(UsuarioRepository);
        const user = await buscarUsuarioService.ejecutar(email);
        return res.status(200).json({ user })
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
        const email = req.user.email;
        const { numeroCuenta, moneda, monto } = req.body;
        //Creo la instancia del servicio e inyecto el Repositorio.
        const transferirService = new TransferenciaService(UsuarioRepository);
        const resultado = await transferirService.ejecutar(email, numeroCuenta, moneda, monto);
        return res.status(200).json(resultado)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};
controller.compraDolar = async (req, res) => {
    try {
        const { monto } = req.body;
        const { email } = req.user;
        //Creo la instancia del servicio y paso por parametro 'compra,' e inyecto el Repositorio.
        const comprarDolarService = new CompraVentaDolarService(UsuarioRepository, 'compra');
        const user = await comprarDolarService.ejecutar(email, monto);
        return res.status(200).json(`Operacion exitosa!, Dolares: ${user.dolar}`);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};
controller.ventaDolar = async (req, res) => {
    try {
        const { monto } = req.body;
        const { email } = req.user;
        //Inicio la instancia del servicio, e inyecto la dependencia Repository, paso por parametro 'venta'.
        const ventaDolarService = new CompraVentaDolarService(UsuarioRepository, 'venta');
        const user = await ventaDolarService.ejecutar(email, monto);
        //Llamo al repositori
        return res.status(200).json(`Operacion exitosa!, Dolares: ${user.dolar}`);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};
controller.extraccion = async (req, res) => {
    const { moneda, monto } = req.body;
    const { email } = req.user;
    try {
        //instancio el servicio inyectando el repositorio y pasando el parametro 'extraccion' como operacion.
        const extraccionService = new ExtraccionDepositoService(UsuarioRepository, 'extraccion');
        const user = await extraccionService.ejecutar(email, moneda, monto);
        res.status(200).json(`Extraccion exitosa!, ${moneda}: ${user[moneda]}`);
    } catch (error) {
        res.status(400).json({ erorr: error.message });
    }
};
controller.deposito = async (req, res) => {
    const { moneda, monto } = req.body;
    const { email } = req.user;
    try {
        //Creo la instancia del servicio y paso por parametro 'deposito,' e inyecto el Repositorio.
        const depositoService = new ExtraccionDepositoService(UsuarioRepository, 'deposito');
        const user = await depositoService.ejecutar(email, moneda, monto);
        res.status(200).json(`Deposito exitoso!, ${moneda}: ${user[moneda]}`);
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