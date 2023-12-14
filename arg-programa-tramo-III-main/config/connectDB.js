const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Estableciendo conexión a la base de datos...')
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('\x1b[32m%s\x1b[0m', 'Base de datos conectada');

    } catch (error) {
        console.log('Error:', error)
    }
}

module.exports = connectDB