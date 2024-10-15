// Modelo de usuarios

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Estructura de usuario
const usuarioSchema = Schema({
    nombre: String,
    apellidos: String,
    email: String,
    password: String,
    rol: String
});

module.exports = mongoose.model('Usuarios', usuarioSchema);