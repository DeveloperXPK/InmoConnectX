// Modelo para las publicaciones de los inmuebles

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Estrucutra de la publicacion
const publicacionSchema = Schema({
    titulo: String,
    descripcion: String,
    precio: Number,
    ubicacion: String,
    usuario: {
        _id: { type: Schema.ObjectId, ref: 'Usuario' },
        nombre: String,
        email: String
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

// mongoose.model('Nombre de la entidad', esquema)
module.exports = mongoose.model('Publicaciones', publicacionSchema);