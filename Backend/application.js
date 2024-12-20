// Creacion de la aplicacion
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
const cors = require('cors');

// Configuramos el body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);


// Exportamos la aplicación
module.exports = app;