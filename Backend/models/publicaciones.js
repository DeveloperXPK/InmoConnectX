// Modelo para las publicaciones de los inmuebles

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Estrucutra de la publicacion
const publicacionSchema = Schema({
    titulo: String,
    precio: Number,
    descripcion: String,
    ubicacion: String,
    imagenes: String,
    usuario: {
        type: Schema.Types.ObjectId, // Referencia al ID del usuario
        ref: 'Usuarios',         // Referencia al modelo de Usuario
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
})

// mongoose.model('Nombre de la entidad', esquema)
module.exports = mongoose.model('Publicaciones', publicacionSchema);