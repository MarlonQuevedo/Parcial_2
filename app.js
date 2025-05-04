const express = require('express');
const app = express();
const connectMongoose = require('./config/mongoose');
require('dotenv').config();

const rutasUsuarios = require('./rutas/rutasUsuarios');
const rutasEnvios = require('./rutas/rutasEnvios');
const rutasProductos = require('./rutas/rutasProductos');

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', rutasUsuarios);
app.use('/api', rutasEnvios);
app.use('/api', rutasProductos);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a POSTMAIL API!');
});

async function iniciarServidor() {
    try {
        await connectMongoose();
        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto: ${port}`);
        });
    } catch (error) {
        console.error("Error al iniciar servidor:", error);
        process.exit(1);
    }
}

iniciarServidor();