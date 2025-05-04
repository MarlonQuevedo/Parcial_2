const express = require('express');
const router = express.Router();
const controlEnvio = require('../controllers/controlEnvio');

router.post('/envios', controlEnvio.crearEnvio);

router.get('/envios/:usuarioId', controlEnvio.getEnviosByUser);

router.delete('/envios/:envioId', controlEnvio.eliminarEnvio);

module.exports = router;