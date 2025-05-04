const mongoose = require('mongoose');
require('dotenv').config();

const connectMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectMongoose; 