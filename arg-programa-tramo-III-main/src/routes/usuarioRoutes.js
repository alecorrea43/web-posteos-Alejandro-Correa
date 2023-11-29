const usuarioRouter = require('express').Router();
const {
    verUsuarios,
    verUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
} = require('./../controllers/UsuariosController.js');

 /* ##################################################### */

// Ver usuarios 
usuarioRouter.get('/usuarios', verUsuarios);

// Ver usuario 
usuarioRouter.get('/usuario/:id', verUsuario);

// Crear usuario (Mongoose)
usuarioRouter.post('/usuario', crearUsuario);

// Editar usuario (Mongoose)
usuarioRouter.put('/usuario', editarUsuario);

// Eliminar usuario (Mongoose)
usuarioRouter.delete('/usuario', eliminarUsuario);

module.exports = usuarioRouter;