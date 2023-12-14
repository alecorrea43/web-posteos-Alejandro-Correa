/**
 * Controlador (acciones y lógica que suceden al llamar al endpoint) 
 * Contiene los endpoints para cambiar el username y la imagen de avatar de usuario 
 */


const User             = require('../models/User')
const perfilController = {}
const { validarJWT }   = require('../middleware/validarJWT')

//CAMBIAR NOMBRE DE USUARIO E IMAGEN
perfilController.changeUsername = async (req, res) => {
    try {
        //Recibimos por body del front el id y nuevo nombre de usuario
        const { id, username } = req.body

        //Ubicamos el usuario en la BD por id y modificamos los datos
        await User.findByIdAndUpdate(id, { username })
        res.status(200).json({ ok: true, message: 'Datos de usuarios actualizados' })

    } catch (err) {

    }

}






module.exports = perfilController