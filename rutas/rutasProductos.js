const express = require('express');
const router = express.Router();
const controlProducto = require('../controllers/controlProducto');

router.post('/productos', controlProducto.crearProducto);

module.exports = router;