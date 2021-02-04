const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//crear servidor
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

//directorio público
app.use(express.static('public')); //public/index.html

//lectura y parseo del body
/**
 * las peticiones que vengan en formato json 
 * las voy a procesar ahi y voy a extraer su contenido
 */
app.use( express.json() );


app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${process.env.PORT}`);
})