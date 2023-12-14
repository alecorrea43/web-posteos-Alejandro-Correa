/**
 * Creación de token para manejos de sesión de usuarios, librería json web token (https://jwt.io/)
 * Este se retorna al crear o loguear un usuarios le damos una expiración de una semana
 */
const jwt = require('jsonwebtoken')

const generateJWT = (uid, username, email, avatarURL) => {

    const JWT_KEY = process.env.JWT_KEY
    const payload = { uid, username, email, avatarURL }

    return jwt.sign(payload, JWT_KEY, {expiresIn: '7d'}) 

}

module.exports = generateJWT

