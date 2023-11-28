const georefRouter = require('express').Router();
const {
    obtenerProvincias,
} = require('./../controllers/GeorefController.js');

georefRouter.get('/obtenerProvincias', obtenerProvincias);

module.exports = georefRouter;
