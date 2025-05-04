const envio = require('../models/envio');
const usuario = require('../models/usuario');
const producto = require('../models/producto');

const crearEnvio = async (req, res) => {
    try {
        const { usuarioId, nombre, direccion, telefono, referencia, observacion, peso } = req.body;

        const user = await usuario.findOne({ usuarioId: usuarioId });
        if (!user || user.creditoEnvios <= 0) {
            return res.status(400).json({ message: "Crédito insuficiente" });
        }

        let costoEnvio = 135;
        if (peso > 3 && peso <= 6) {
            costoEnvio *= 2;
        } else if (peso > 6) {
            costoEnvio *= 3;
        }
        const nuevoEnvio = new envio({
            usuarioId,
            nombre,
            direccion,
            telefono,
            referencia,
            observacion,
            costo: costoEnvio
        });

        const guardarEnvio = await nuevoEnvio.save();

        await usuario.updateOne(
            { usuarioId: usuarioId },
            { $inc: { creditoEnvios: -1 } }
        );

        res.status(201).json({ 
            message: "Envío creado exitosamente", 
            envio: guardarEnvio 
        });

    } catch (error) {
        console.error("Error al crear envío:", error);
        res.status(500).json({ 
            message: "Error al crear el envío",
            error: error.message 
        });
    }
};

const getEnviosByUser = async (req, res) => {
    try {
        const usuarioId = req.params.usuarioId;
        const envios = await envio.find({ 
            usuarioId: usuarioId,
            estado: 'pendiente'
        });
        
        res.status(200).json(envios);
    } catch (error) {
        console.error("Error al obtener los envíos del usuario:", error);
        res.status(500).json({ 
            message: "Error al obtener los envíos",
            error: error.message 
        });
    }
};

const eliminarEnvio = async (req, res) => {
    try {
        const envioId = req.params.envioId;
        
        const envioEliminar = await envio.findById(envioId);
        if (!envioEliminar) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }

        await envio.updateOne(
            { _id: envioId },
            { $set: { estado: 'eliminado' } }
        );

        await usuario.updateOne(
            { usuarioId: envioEliminar.usuarioId },
            { $inc: { creditoEnvios: 1 } }
        );

        res.status(200).json({ message: "Envío eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el envío:", error);
        res.status(500).json({ 
            message: "Error al eliminar el envío",
            error: error.message 
        });
    }
};

module.exports = { crearEnvio, getEnviosByUser, eliminarEnvio };