class BuscarUsuarioController {
    constructor(BuscarUsuarioService) {
        this.BuscarUsuarioService = BuscarUsuarioService; //inyecto el servicio en el controlador.
    };
    buscarUsuario = async (req, res) => {
        try {
            const {email} = req.body;
            const user = await this.BuscarUsuarioService.ejecutar(email);

            return res.status(200).json({user})
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
};
module.exports = BuscarUsuarioController;