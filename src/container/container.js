class Container {
    constructor() {
        this.services = {};  // Guardamos los servicios registrados
    };

    // Metodo para registrar servicios en el contenedor
    register = (name, service) => {
        // Verifico que el servicio y el nombre sean correctos
        if (!name || !service) {
            throw new Error('El nombre o el servicio no pueden ser nulos');
        };

        this.services[name] = service;
    };

    // Metodo para obtener un servicio del contenedor
    get = (name) => {
        if (!this.services[name]) {
            throw new Error(`Error: Servicio '${name}' no registrado.`);
        };
        return this.services[name];
    };
}

module.exports = new Container();  // Exporto como singleton