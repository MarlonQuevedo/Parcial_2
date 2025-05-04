const mongoose = require('mongoose');

const envioSchema = new mongoose.Schema({
    usuarioId: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    referencia: { type: String, required: true },
    observacion: { type: String, required: true },
    costo: { type: Number, required: true },
    estado: { type: String, enum: ['pendiente', 'eliminado'], default: 'pendiente' }
});

const envio = mongoose.model('envio', envioSchema);

module.exports = envio;