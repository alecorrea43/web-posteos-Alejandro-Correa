const jwt = require('jsonwebtoken');

const AutenticacionController = {}

const JWT_KEY = process.env.JWT_KEY;

const usuarios = [
    { id: 1, usuario: 'Lord', contrasenia: '123456' },
    { id: 2, usuario: 'Lady', contrasenia: 'abcdef' },
];

AutenticacionController.autenticar = (req, res) => {
    const usuario = req.body.usuario;

    // Simular autenticación
    let token = jwt.sign({ usuario: usuario }, JWT_KEY);

    res.json({ token: token });
}

AutenticacionController.registrar = (req, res) => {
    // Simular regitro...
}

AutenticacionController.verificarToken = (req, res) => {
    const token = req.body.token;

    try {
        let desencriptado = jwt.verify(token, JWT_KEY);

        res.json({ datos: desencriptado });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Se ha generado un error',
            error: error,
        });
    }
}

module.exports = AutenticacionController;
