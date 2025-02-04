class CrearUsuarioController {
    constructor(CrearUsuarioService) {
        this.CrearUsuarioService = CrearUsuarioService; //inyecto el servicio en el controlador.
    };
    crearUsuario = async (req, res) => {
        try {
            const { nombre, apellido, email, usuario, password } = req.body;
            const user = await this.CrearUsuarioService.ejecutar(nombre, apellido, email, usuario, password);
            res.status(200).json({ message: 'Usuario creado exitosamente', user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};
module.exports = CrearUsuarioController;
