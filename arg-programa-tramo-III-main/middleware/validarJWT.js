/**
 * Validaremos el JWT por medio de un middleware, luego se usara en distintas rutas endPoint
 */

const jwt = require('jsonwebtoken')  //Biblioteca JWT

const validarJWT = (req, res, next) => {
    //El toquen viene por header, mediante una configuración de axios, (ver carpeta api frontend)
    const token = req.header('token')    
    //Si el usuario no esta autenticado o expiro el token
    if(!token) return res.status(401).json({ 
        ok : false,
        msg: 'No se encuentra el token en el header de la petición'
    })

    try {
        const dataToken     = jwt.verify(token, process.env.JWT_KEY)
            req.uid       = dataToken.uid
            req.username  = dataToken.username
            req.email     = dataToken.email
            req.avatarURL = dataToken.avatarURL
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'invalid Token',
        })
    }

    next()
}

module.exports = { validarJWT }
