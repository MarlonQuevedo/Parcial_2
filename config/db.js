const {MongoClient} = require('mongodb')
require('dotenv').config()

const uri = process.env.MONGODB_URI;
const cliente = new MongoClient(uri);

console.log("Bienvenido")

async function connectDB() {
    try{
        await cliente.connect();
        console.log('Conexion a mongo exitosa');
        return cliente.db(process.env.parcial2)
    }catch (error){
        console.error('Error al conectar con mongoDB:', error)
    }
}


module.exports = connectDB;