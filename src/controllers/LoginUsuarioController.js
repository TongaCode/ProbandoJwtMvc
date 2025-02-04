class LoginUsuarioController {
    constructor(LoginUsuarioService) {
        this.LoginUsuarioService = LoginUsuarioService;
    };
    login = async (req, res) => {
        try {
            const { usuario, password, email } = req.body;
            const token = await this.LoginUsuarioService.ejecutar(usuario, password, email);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Habilitar secure en producción
                maxAge: 24 * 60 * 60 * 1000 // 1 día
            });

            return res.status(200).json({ message: `Bienvenido ${usuario}` });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        };
    };
};

module.exports = LoginUsuarioController;