const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombres: String,
    apellidos: String,
});

const UsuarioModel = model('usuario', UsuarioSchema);

module.exports = UsuarioModel;
