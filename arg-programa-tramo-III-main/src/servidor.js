require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const conectarMongo = require('./config/MongooseConfig.js');

const usuarioRouter = require('./routes/usuarioRoutes.js');
const autenticacionRoutes = require('./routes/autenticacionRoutes.js');
const archivoRouter = require('./routes/archivoRouter.js');
const georefRouter = require('./routes/georefRouter.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(fileUpload());

// Rutass
app.use(usuarioRouter);

app.use(archivoRouter);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    //database();
    conectarMongo();
});
