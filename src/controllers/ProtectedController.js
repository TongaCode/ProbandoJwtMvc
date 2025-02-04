class ProtectedController {
    constructor(ProtectedService) {
        this.ProtectedService = ProtectedService;
    };
    protected = async (req, res) => {
        try {
            const { email } = req.user;
            const user = await this.ProtectedService.ejecutar(email);

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

};
module.exports = ProtectedController;