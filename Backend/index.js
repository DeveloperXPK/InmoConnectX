// Ejecución del servidor
const mongoose = require('mongoose');
const app = require('./application');

// Buscamos un puerto disponible
const desiredPORT = 3000 ?? process.env.PORT;

// pc: mongodb://127.0.0.1:27017/bd

// Conexión a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/inmoconnect', { useNewUrlParser: true })
    .then(
        () => {
            console.log('Conexión a la base de datos establecida con éxito');
            app.listen(9898, () => {
                console.log(`Servidor corriendo en el puerto http://localhost:9898`);
            });
        },
        err => {
            console.error('Error al conectar a la base de datos', err);
        }
    )

