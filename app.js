const express = require('express');
const app = express();
const  router  = require('./src/routers/index.router');

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Variables de entorno
const port = process.env.PORT;

// Middelwares
app.use(express.json());

// Routers
app.use(router);


app.listen(port, () => {
    console.log('Server Online.');
});