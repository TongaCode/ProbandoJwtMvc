class VenderDolarController {
    constructor(CompraVentaDolarService) {
        this.CompraVentaDolarService = CompraVentaDolarService;
    };

    venderDolar = async (req, res) => {
        try {
            const { monto } = req.body;
            const { email } = req.user;
            const user = await this.CompraVentaDolarService.ejecutar(email, monto);

            return res.status(200).json({
                operacion: `Venta dolar Exitosa`,
                monto: monto,
                nuevoBalanceDolar: user.dolar,
                nuevoBalancePesos: user.peso
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
};

module.exports = VenderDolarController;