// Controlador para las publicaciones (crear, obtener, actualizar y eliminar)
const publicaciones = require('../models/publicaciones');
const Publicaciones = require('../models/publicaciones');

// Crear una publicación
function crearPublicacion(req, res) {

    // Obtenemos los datos de la publicación
    const {
        titulo,
        precio,
        descripcion,
        imagenes
    } = req.body;

    // Creamos la publicación
    const publicacion = new Publicaciones();
    publicacion.titulo = titulo;
    publicacion.precio = precio;
    publicacion.descripcion = descripcion;
    publicacion.imagenes = imagenes;

    // Guardamos la publicación en la base de datos
    publicacion.save()
        .then(
            (publicacionGuardada) => {
                res.status(200).send({ publicacion: publicacionGuardada });
            },
            err => {
                res.status(500).send({ message: 'Error al guardar la publicación' });
            }
        );
};

// Editar una publicación
function editarPublicacion(req, res) {

    // Obtenemos el id de la publicación
    const idPublicacion = req.params._id;

    // Obtenemos los datos de la publicación
    const {
        titulo,
        precio,
        descripcion,
        imagenes
    } = req.body;

    // Creamos un nuevo objeto con los datos editados
    const publicacionEditada = new Publicaciones();
    publicacionEditada.titulo = titulo;
    publicacionEditada.precio = precio;
    publicacionEditada.descripcion = descripcion;
    publicacionEditada.imagenes = imagenes;

    // Actualizamos la publicación en la base de datos
    Publicaciones.findByIdAndUpdate(idPublicacion, publicacionEditada, { new: true })
        .then(
            (publicacionActualizada) => {
                res.status(200).send({ publicacion: publicacionActualizada });
            },
            err => {
                res.status(500).send({ message: 'Error al actualizar la publicación' });
            }
        );
};

// Eliminar una publicación
function eliminarPublicacion(req, res) {

    // Obtenemos el id de la publicación
    const idPublicacion = req.params._id;

    // Eliminamos la publicación de la base de datos
    Publicaciones.findByIdAndDelete(idPublicacion)
        .then(
            (publicacionEliminada) => {
                res.status(200).send({ publicacion: publicacionEliminada });
            },
            err => {
                res.status(500).send({ message: 'Error al eliminar la publicación' });
            }
        )
}

// Consulta de publicaciones 

// Todas las publicaciones
function obtenerPublicaciones(req, res) {
    Publicaciones.find()
        .then(
            (publicaciones) => {
                res.status(200).send({ publicaciones: publicaciones });
            },
            err => {
                res.status(500).send({ message: 'Error al obtener las publicaciones' });
            }
        );
};

// Publicación por id
function obtenerPublicacion(req, res) {

    // Obtenemos el id de la publicación
    const idPublicacion = req.params._id;

    // Buscamos la publicación en la base de datos
    Publicaciones.findById(idPublicacion)
        .then(
            (publicacion) => {
                res.status(200).send({ publicacion: publicacion });
            },
            err => {
                res.status(500).send({ message: 'Error al obtener la publicación' });
            }
        );
};

// Exportamos las funciones del controlador
module.exports = {
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion,
    obtenerPublicaciones,
    obtenerPublicacion
}