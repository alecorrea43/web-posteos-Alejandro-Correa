const mongoose = require('mongoose')

/**
 * Modelo de usuarios de la base de datos
 */

const UserSchema = new mongoose.Schema({
    username: {
        type     : String,
        required : true,
    },
    email: {
        type    : String,
        required: true,
        unique  : true,
    },
    password: {
        type     : String,
        required : true,
    },
    avatarURL: {
        type   : String,
        require: false,
    }
})


const User = mongoose.model('User', UserSchema) //El modelo es en singular, mongo lo transforma al plural

module.exports = User