class ExtraccionController {
    constructor(ExtraccionDepositoService) {
        this.ExtraccionDepositoService = ExtraccionDepositoService;
    };

    extraccion = async (req, res) => { 
        try {
            const {moneda, monto} = req.body;
            const {email} = req.user;
            //Llamo al servicio
            const user =  await this.ExtraccionDepositoService.ejecutar(email, moneda, monto);

            res.status(200).json(`Extraccion exitosa!, ${moneda}: ${user[moneda]}`);
        } catch (error) {
            res.status(400).json({ erorr: error.message });  
        };
    };
};
module.exports = ExtraccionController;