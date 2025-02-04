class CompraDolarController {
    constructor(CompraVentaDolarService) {
        this.CompraVentaDolarService = CompraVentaDolarService;
    };
    compraDolar = async (req, res) => {
        try {
            const { email } = req.user;
            const { monto } = req.body;
            const user = await this.CompraVentaDolarService.ejecutar(email, monto);

            return res.status(200).json({operacion: `Compra dolar Exitosa`,
                monto: monto,
                nuevoBalanceDolar: user.dolar,
                nuevoBalancePesos: user.peso
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    };
};

module.exports = CompraDolarController;