// Controlador para las publicaciones (crear, obtener, actualizar y eliminar)
const Publicaciones = require('../models/publicaciones');

// Crear una publicación
function crearPublicacion(req, res) {
    const nuevaPublicacion = new Publicaciones({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        ubicacion: req.body.ubicacion,
        usuario: {
            _id: req.user._id,
            nombre: req.user.nombre,
            email: req.user.email
        }
    });

    nuevaPublicacion.save()
        .then(publicacion => {
            res.status(201).json({ publicacion });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error al crear la publicación' });
        });
}

// Editar una publicación
function editarPublicacion(req, res) {

    // Obtenemos el id de la publicación desde la URL (req.params)
    const idPublicacion = req.params._id;

    // Obtenemos los datos de la publicación desde el cuerpo de la petición (req.body)
    const {
        titulo, // Título de la publicación
        precio, // Precio de la publicación
        descripcion, // Descripción de la publicación
        ubicacion, // Ubicación de la publicación
        imagenes, // Imágenes de la publicación
    } = req.body;

    // Creamos un nuevo objeto de Inmueble con los datos editados
    const publicacionEditada = new Publicaciones();
    publicacionEditada.titulo = titulo; // Guardamos el título de la publicación
    publicacionEditada.precio = precio; // Guardamos el precio de la publicación
    publicacionEditada.descripcion = descripcion; // Guardamos la descripción de la publicación
    publicacionEditada.ubicacion = ubicacion; // Guardamos la ubicación de la publicación
    publicacionEditada.imagenes = imagenes; // Guardamos las imágenes de la publicación

    // Actualizamos la fecha de edición de la publicación
    publicacionEditada.fechaEdicion = new Date();

    // NO ACTUALIZAMOS EL USUARIO QUE CREÓ LA PUBLICACIÓN YA QUE ES EL UNICO
    // QUE PUEDE EDITARLA


    // Actualizamos la publicación en la base de datos
    Publicaciones.findByIdAndUpdate(idPublicacion, publicacionEditada, { new: true }) // {new: true} devuelve el objeto actualizado
        .then(
            // Si la publicación se actualiza correctamente enviamos un mensaje de éxito
            (publicacionActualizada) => {
                res.status(200).send({ publicacion: publicacionActualizada });
            },
            // Si ocurre un error al actualizar la publicación enviamos un mensaje de error
            err => {
                res.status(500).send({ message: 'Error al actualizar la publicación' });
            }
        );
};

// Eliminar una publicación
function eliminarPublicacion(req, res) {

    // Obtenemos el id de la publicación desde la URL (req.params)
    const idPublicacion = req.params._id;

    // Eliminamos la publicación de la base de datos por su id
    Publicaciones.findByIdAndDelete(idPublicacion)
        .then(
            // Si la publicación se elimina correctamente enviamos un mensaje de éxito
            // y la publicación eliminada
            (publicacionEliminada) => {
                res.status(200).send({ publicacion: publicacionEliminada });
            },
            // Si ocurre un error al eliminar la publicación enviamos un mensaje de error
            err => {
                res.status(500).send({ message: 'Error al eliminar la publicación' });
            }
        )
}

// Consulta de publicaciones 

// Todas las publicaciones
function obtenerPublicaciones(req, res) {
    Publicaciones.find() // Buscamos todas las publicaciones
        .then(
            // Esto nos retorna un arreglo con todas las publicaciones
            // asi que desde el front se debe recorrer el arreglo para mostrar
            // cada publicación
            (publicaciones) => {
                res.status(200).send({ publicaciones: publicaciones });
            },
            // Si ocurre un error al obtener las publicaciones enviamos un mensaje de error
            err => {
                res.status(500).send({ message: 'Error al obtener las publicaciones' });
            }
        );
};

// Publicación por id
function obtenerPublicacion(req, res) {

    // Obtenemos el id de la publicación desde la URL (req.params)
    const idPublicacion = req.params._id;

    // Buscamos la publicación en la base de datos por su id
    Publicaciones.findById(idPublicacion)
        .then(
            // Si la publicación se encuentra enviamos la publicación
            // en el front la podemos mostrar directamente por su id
            // es posible ya que es un solo objeto
            (publicacion) => {
                res.status(200).send({ publicacion: publicacion });
            },
            // Si ocurre un error al obtener la publicación enviamos un mensaje de error
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