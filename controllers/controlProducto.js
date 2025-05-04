const producto = require('../models/producto');
const envio = require('../models/envio');

const crearProducto = async (req, res) => {
    try {
        const { envioId, descripcion, peso, bultos, fechaEntrega } = req.body;

        const envioExistente = await envio.findById(envioId);
        if (!envioExistente) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }

        const nuevoProducto = new producto({
            envioId,
            descripcion,
            peso,
            bultos,
            fechaEntrega
        });

        const guardarProducto = await nuevoProducto.save();
        
        res.status(201).json({ 
            message: "Producto guardado exitosamente", 
            producto: guardarProducto 
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ 
            message: "Error al guardar el producto",
            error: error.message 
        });
    }
};

module.exports = { crearProducto };