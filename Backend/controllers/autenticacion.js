// Controlador para la autenticación de usuarios
const bcrypt = require('bcrypt');
const token = require('../helpers/autenticacion');
const Usuario = require('../models/usuarios');

// Registro de usuario
function registrarUsuario(req, res) {

    // Obtenemos los datos del usuario
    const {
        nombre,
        apellidos,
        email,
        password
    } = req.body;

    // Creamos el salt y hasheamos la contraseña
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    // Creamos el usuario
    const usuario = new Usuario();
    usuario.nombre = nombre;
    usuario.apellidos = apellidos;
    usuario.email = email;
    usuario.password = passwordHash; // Pasamos la contraseña hasheada al usuario
    usuario.rol = rol;

    // Guardamos el usuario en la base de datos
    usuario.save()
        .then(
            (usuarioGuardado) => {
                res.status(200).send({ usuario: usuarioGuardado });
            },
            err => {
                res.status(500).send({ message: 'Error al guardar el usuario' });
            }
        );
};

// Login de usuario
function iniciarSesion(req, res) {

    // Obtenemos los datos para el login
    const {
        email,
        password
    } = req.body;

    // Buscamos el usuario en la base de datos
    Usuario.findOne({ email: email })
        .then(
            (usuarioEncontrado) => {
                if (!usuarioEncontrado) {
                    res.status(404).send({ message: 'Usuario no encontrado' });
                } else {

                    // Comparamos la contraseña con la contraseña hasheada
                    if (bcrypt.compareSync(password, usuarioEncontrado.password)) {

                        // Generamos el token
                        const tokenGenerado = token.generarToken(usuarioEncontrado);

                        // Enviamos el token
                        res.status(200)
                            .send({
                                message: 'Inicio de sesión correcto',
                                token: tokenGenerado
                            });
                    }
                }
            },
            err => {
                res.status(500).send({ message: 'Las credenciales no coinciden' });
            }
        )
};

// Exportamos los métodos
module.exports = {
    registrarUsuario,
    iniciarSesion
}