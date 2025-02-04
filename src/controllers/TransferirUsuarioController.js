class TransferirUsuarioController {
    constructor(TransferirService) {
        this.TransferirService = TransferirService;
    };

    transferir = async (req, res) => {
        try {
            const email = req.user.email;
            const { numeroCuenta, moneda, monto } = req.body;
            const user = await this.TransferirService.ejecutar(email, numeroCuenta, moneda, monto);

            return res.status(200).json(`La transferencia fue exitosa, nuevo balance: ${user[moneda]}, Monto transferido: ${monto}`);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
};

module.exports = TransferirUsuarioController;