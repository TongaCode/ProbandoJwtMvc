const express = require('express');
const app = express();

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Variables de entorno
const port = process.env.port;

// Middelwares
app.use(express.json());


app.listen(port, ()=> {
    console.log('Server Online.');
});