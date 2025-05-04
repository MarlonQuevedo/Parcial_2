const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    usuarioId: { type: String, required: true, unique: true },
    creditoEnvios: { type: Number, default: 0, required: true },
    plan: { type: Number, enum: [1, 2, 3], required: true } // 1: $135, 2: $160, 3: $180
});

const usuario = mongoose.model('users', usuarioSchema, "users");

module.exports = usuario;