// Autenticación de usuario

const moment = require('moment');
const jwt = require('jwt-simple');

// Clave secreta para el token
const SECRET = '19d1d5941e0f4b4e8b4ee60bfc5c707c94de471db537f9425ee1bd88c7c1f5e6';

// Generacion de token
function generarToken(usuario) {

    // Cargamos la información del usuario en el token
    const payload = {
        sub: usuario._id,
        name: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,

        // Momento en el que se crea el token
        iat: moment.unix(),

        // Momento en el que expira el token
        exp: moment().add(5, 'minutes').unix()
    };

    // Devolvemos el token generado
    return jwt.encode(payload, SECRET);
};


// Validacion de token
function validarToken(req, res, next) {

    // Verificamos que el token se haya enviado
    try {

        // Extraemos el token de la cabecera de la petición
        const token = req.headers.authorization.split(' ')[1];

        // Decodificamos el token
        const payload = jwt.decode(token, SECRET);

        // Guardamos la información del usuario en req.user
        req.user = {
            _id: payload.sub,
            nombre: payload.name,
            email: payload.email,
            rol: payload.rol
        };

        // Contimuamos con la ejecución
        next();

    } catch {
        res.status(403).send({ message: 'Error al iniciar sesion' })
    };
};

// Validar permiso mediante rol
function validarPermiso(rolesPermitidos) {

    // Retornamos una funcion que se ejecuta en la ruta
    return (req, res, next) => {

        // Verificamos los roles permitidos usando req.user.rol en lugar de req.header.usuarioRol
        if (rolesPermitidos.includes(req.user.rol)) {

            // Continuamos con la peticion
            next();
        } else {

            // Retornamos un mensaje de que no tiene permiso
            res.status(403).send({ message: 'No tienes permiso para realizar esta acción' })
        };
    };
};

// Exportamos las funciones
module.exports = {
    generarToken,
    validarToken,
    validarPermiso
}