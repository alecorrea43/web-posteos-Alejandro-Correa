/**
 * Endpoints de gestión de usuarios, llaman a su respectivo controlador desde la carpeta controllers
 */

const authRouter = require('express').Router()                   //Enrutador de express
const authController = require('../controllers/authController')  //Controladores (lógica y acciones que suceden al solicitar el endpoint) 
const { validarJWT } = require('../middleware/validarJWT')

//EndPoint registrar usuario
authRouter.post('/register', authController.createUser) // ./api/user/register method: POST

//Endpoint loguear usuario
authRouter.post('/login', authController.loginUser )    // ./api/user/login method: POST

//EndPoint que checkea el token
authRouter.get('/validateToken',validarJWT, authController.validateToken) // ./api/user/validateToken method: GET

module.exports =  authRouter