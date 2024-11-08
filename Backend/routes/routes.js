// Rutas de la API
const express = require('express');
const routes = express.Router();

// Importamos los controladores
const autenticacionController = require('../controllers/autenticacion');
const publicacionesController = require('../controllers/publicaciones');
const token = require('../helpers/autenticacion');

// Rutas de autenticación
routes.post('/registro', autenticacionController.registrarUsuario);
routes.post('/login', autenticacionController.iniciarSesion);

// Rutas de publicaciones

// Crear publicación
routes.post('/publicaciones',
    token.validarToken,
    token.validarPermiso(['admin', 'user']),
    publicacionesController.crearPublicacion,
);

// Editar publicación
routes.put('/publicaciones/:_id',
    token.validarToken,
    token.validarPermiso(['admin', 'user']),
    publicacionesController.editarPublicacion
);

// Eliminar publicación
routes.delete('/publicaciones/:_id',
    token.validarToken,
    // token.validarPermiso(['admin']),
    publicacionesController.eliminarPublicacion
);

// Obtener publicaciones
routes.get('/publicaciones',
    token.validarToken,
    token.validarPermiso(['admin', 'user']),
    publicacionesController.obtenerPublicaciones
);

// Obtener publicación por id
routes.get('/publicaciones/:_id',
    token.validarToken,
    token.validarPermiso(['admin', 'user']),
    publicacionesController.obtenerPublicacion);

// Exportamos las rutas
module.exports = routes;