const ArchivosController = {}

const rutaPrincipal = __dirname + '/../../tmp/';

ArchivosController.subirArchivo = (req, res) => {
    try {
        const archivo = req.files.miArchivo;
        const rutaGuardar = rutaPrincipal + archivo.name;

        return archivo.mv(rutaGuardar, function(err) {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                return res.json({ mensaje: 'El archivo se subió correctamente' });
            }
        });
    } catch (err) {
        return res.status(500).json({ error: 'Ocurrió un error al intentar subir el archivo' });
    }
}

module.exports = ArchivosController;
