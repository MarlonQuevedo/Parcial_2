const express = require('express')
const router = express.Router()
const controlUsuario = require('../controllers/controlUsuario')

router.post('/usuario/creditos', controlUsuario.inicializarCreditosUsuario)

router.get('/usuario/creditos/:usuarioId', controlUsuario.getAvailableEnvios)

module.exports = router;