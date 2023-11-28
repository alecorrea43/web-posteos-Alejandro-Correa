const axios = require('axios');

const GeorefController = {}

GeorefController.obtenerProvincias = async (req, res) => {
    const url = 'https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.2/download/provincias.json';
    
    const respuesta = await axios.get(url);

    return res.json(respuesta.data);
}

module.exports = GeorefController;
