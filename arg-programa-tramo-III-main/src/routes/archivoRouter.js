const archivoRouter = require('express').Router();
const {
    subirArchivo,
} = require('./../controllers/ArchivosController.js');

archivoRouter.post('/subirArchivo', subirArchivo);

module.exports = archivoRouter;