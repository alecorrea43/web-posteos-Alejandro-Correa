const UsuarioModel = require('./../models/UsuarioModel.js');

const UsuariosController = {}

// Ver usuarios
UsuariosController.verUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await UsuarioModel.findAll();

        return res.json(listaUsuarios);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });
    }
}

// Ver usuario
UsuariosController.verUsuario = (req, res) => {
    // Ver un usuario en particular
    return res.json({ mensaje: 'Ruta: ver usuario' });
}

// Crear usuario
UsuariosController.crearUsuario = (req, res) => {
    return res.json({ mensaje: 'Ruta: crear usuario' });
}

// Editar usuario
UsuariosController.editarUsuario = (req, res) => {
    return res.json({ mensaje: 'Ruta: editar usuario' });
}

// Eliminar usuario
UsuariosController.eliminarUsuario = (req, res) => {
    return res.json({ mensaje: 'Ruta: eliminar usuario' });
}

module.exports = UsuariosController;
