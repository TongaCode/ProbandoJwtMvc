const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conectado a la base de datos mongo db!.');
    } catch (err) {
      console.error('Error al conectar a la base de datos mongo:', err.message);
      process.exit(1); // Termina el proceso en caso de error de conexión
    }
  };
  
  module.exports = connectDB;