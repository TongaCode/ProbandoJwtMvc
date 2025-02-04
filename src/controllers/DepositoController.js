class DepositoController {
    constructor(ExtraccionDepositoService) {
        this.ExtraccionDepositoService = ExtraccionDepositoService;
    };
    deposito = async (req, res) => {
        try {
            const { moneda, monto } = req.body;
            const { email } = req.user;
            //Llamo al service
            const user = await this.ExtraccionDepositoService.ejecutar(email, moneda, monto);

            res.status(200).json(`Deposito exitoso!, ${moneda}: ${user[moneda]}`);
        } catch (error) {
            res.status(400).json({ erorr: error.message });
        }
    };
};

module.exports = DepositoController;