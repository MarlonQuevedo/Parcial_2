const { default: mongoose } = require('mongoose');
const usuario = require('../models/usuario');

const inicializarCreditosUsuario = async (req, res) => {
    try {
        const { usuarioId, plan } = req.body;
        
        let creditoEnvios = 0;
        if (plan === 1) {
            creditoEnvios = 30;
        } else if (plan === 2) {
            creditoEnvios = 40;
        } else if (plan === 3) {
            creditoEnvios = 60;
        } else {
            return res.status(400).json({ message: "Plan seleccionado invalido" });
        }

        const result = await usuario.updateOne(
            { usuarioId: usuarioId },
            { 
                $set: { 
                    creditoEnvios: creditoEnvios,
                    plan: plan
                } 
            },
            { upsert: true }
        );

        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            return res.status(404).json({ message: "No se pudo actualizar el usuario" });
        }

        res.status(200).json({ 
            message: "Creditos de usuario actualizados", 
            creditoEnvios: creditoEnvios,
            plan: plan
        });

    } catch (error) {
        console.error("Error al actualizar los creditos:", error);
        res.status(500).json({ 
            message: "Error interno del servidor",
            error: error.message 
        });
    }
}

const getAvailableEnvios = async (req, res) => {
    try {
        const usuarioId = req.params.usuarioId;
        const user = await usuario.findOne({ usuarioId: usuarioId });
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({
            usuarioId: user.usuarioId,
            creditoEnvios: user.creditoEnvios,
            plan: user.plan
        });
    } catch (error) {
        console.error("Error al obtener envios validos", error);
        res.status(500).json({ 
            message: "Error al obtener envios validos",
            error: error.message 
        });
    }
}

module.exports = { inicializarCreditosUsuario, getAvailableEnvios };