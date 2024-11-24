// Función para generar un número de cuenta aleatorio
const generarNumeroCuenta = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Número de 10 dígitos
};

module.exports = generarNumeroCuenta;