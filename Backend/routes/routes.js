// Rutas de la API
const express = require('express');
const routes = express.Router();

// Importamos los controladores
const autenticacionController = require('../controllers/autenticacion');
const publicacionesController = require('../controllers/publicaciones');
const token = require('../helpers/autenticacion');

// Rutas de autenticación
routes.get('/registro', autenticacionController.registrarUsuario);
routes.get('/login', autenticacionController.iniciarSesion);

// Rutas de publicaciones
routes.post('/publicaciones',
    token.validarToken,
    token.validarPermiso(['admin', 'user']),
    publicacionesController.crearPublicacion,
);

routes.put('/publicaciones/:_id',
    token.validarToken,
    token.validarPermiso(['admin', 'user']),
    publicacionesController.editarPublicacion
);

routes.delete('/publicaciones/:_id',
    token.validarToken,
    token.validarPermiso(['admin']),
    publicacionesController.eliminarPublicacion
);

routes.get('/publicaciones',
    token.validarToken,
    token.validarPermiso(['admin']),
    publicacionesController.obtenerPublicaciones
);

routes.get('/publicaciones/:_id',
    token.validarToken,
    token.validarPermiso(['admin', 'user']),
    publicacionesController.obtenerPublicacion);

// Exportamos las rutas
module.exports = routes;