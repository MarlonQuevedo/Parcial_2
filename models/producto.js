const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    envioId: { type: mongoose.Schema.Types.ObjectId, ref: 'envio', required: true },
    descripcion: { type: String, required: true },
    peso: { type: Number, required: true },
    bultos: { type: Number, required: true },
    fechaEntrega: { type: Date, required: true }
});

const producto = mongoose.model('producto', productoSchema);

module.exports = producto;