/**
 * Endpoints que se encarga de cambiar el perfil o imagen de usuario, llaman a su respectivo controlador desde la carpeta controllers
 * Usaremos el middleware para validar el token en cada ruta esto nos da acceso a la info del mismo por request
 * pudiendo fijar asi valores como el uid del usuario
 */

const perfilRouter     = require('express').Router()
const perfilController = require('../controllers/perfilController')
const { validarJWT } = require('../middleware/validarJWT')



//Modifica el nombre de usuario
perfilRouter.put('/changeUsername', validarJWT, perfilController.changeUsername) // ./api/perfil/changeUsername 




module.exports = perfilRouter