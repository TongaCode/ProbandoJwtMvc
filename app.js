const express = require('express');
const app = express();
const connectDB = require('./confing/mongo');
const router = require('./src/routers/index.router');

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Variables de entorno
const PORT = process.env.PORT || 3000;

// Middelwares
app.use(express.json());

// Routers
app.use(router);

connectDB();
app.listen(PORT, () => {
    console.log('Server Online.');
});