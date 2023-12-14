/**
 * Controlador (acciones y lógica que suceden al llamar al endpoint) 
 * se encarga de todo lo relacionado a autentificación de usuarios (crear en BD, loguear y validación de token) 
 */

//Modelo que usaremos para crear usuario en mongoDB, contiene los métodos para realizar operaciones en la bd
const User           = require('../models/User')  //
const bcrypt         = require('bcryptjs')
const generateJWT    = require('../libs/jwt')
const authController = {}

//REGISTER
authController.createUser = async (req,res) => {
    try {
        //Recibimos los datos del formularios de registro del front
        const { username, email, password, avatarURL = null } = req.body

        //Encriptaremos el password por seguridad con la biblioteca bcryptjs
        const salt           = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        //Creamos los datos que almacenaremos en la bd con el modelo
        const newUser = new User({
            username,
            email,
            avatarURL,
            password: hashedPassword,
        })
        const createUserDB = await newUser.save() // método mongoose para guardar en su bd
        
        //Almacenamos los datos que enviaremos al front (saca password y v_)
        const user = {uid: createUserDB._id, username, email, avatarURL}        
        const token = generateJWT(createUserDB._id, createUserDB.username, createUserDB.email, createUserDB.avatarURL) //creamos JWT para manejo de sesión en el front
        res.status(201).json({ user,token})                              //Respuesta si se inserto usuario en DB
    } catch (err) {
        /**
         *Dado que al validador unique del Schema no se le puede asignar un texto personalizado,
         *lo evaluamos en el catch (Hay un biblioteca que soluciona esto pero preferí hacerlo manual)
        */
        console.log(err)
        //Código que nos dice si el usuario o el email ya están registrados
        err.code === 11000 
        ? res.status(401).json(`'${Object.values(err.keyValue)}', ya se encuentra registrado`)
        : res.status(500).json(err) //Respuesta si hay error de otro tipo
    }
}

//LOGIN
authController.loginUser = async (req,res) => {
    try {
        //Recibimos los datos del formulario de login del frontend
        const { email, password } = req.body
        
        //Buscamos por el email en la bd no retornamos password y versión
        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json('Usuario incorrecto')           //Si el email no se encuentra

        //Si el email es encontrado compara el password del usuario recibido con el encontrado
        const validPassword = bcrypt.compareSync(password, userFound.password)
        if(!validPassword) return res.status(400).json('Password incorrecto')       //Si la contraseña no coincide

        //Almacenamos los datos que enviaremos al front (saca password y v_)
        const user = {
            uid      : userFound._id,
            username : userFound.username,
            email    : userFound.email,
            avatarURL: userFound.avatarURL,
        }
        const token = generateJWT(userFound._id, userFound.username, userFound.email, userFound.avatarURL)    //creamos JWT para manejo de sesión en el front
        res.status(201).json({token, user})                             //Si coincide usuario y contraseña

    } catch (err) {
        console.log(err)
        res.status(500).json('error interno')
    }
}

//VALIDAR TOKEN
authController.validateToken = (req,res) => {
    // Si llegamos a este punto, el token ha sido validado correctamente por el middleware
    res.status(200).json({
        ok       : true,
        msg      : 'Token válido',
        uid      : req.uid,
        username : req.username,
        email    : req.email,
        avatarURL: req.avatarURL
    })
}
module.exports = authController