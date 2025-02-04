const express = require('express');
const app = express();
const connectDB = require('./confing/mongo');
require('./src/instancias/instancias');//En este archivo registro los servicios antes de utilizarlos, debe estar antes del router.
const router = require('./src/routers/index.router');
const cookieParser = require('cookie-parser');

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Variables de entorno
const PORT = process.env.PORT || 3000;

// Middelwares
app.use(express.json());
app.use(cookieParser());// Middleware para manejar cookies.

// Routers
app.use(router);

connectDB();
app.listen(PORT, () => {
    console.log('Server Online.');
});