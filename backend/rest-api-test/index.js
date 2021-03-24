const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/archivos', require('./app/routes/archivos'));

app.listen(4000, () => {
    console.log(`Servidor ejecutándose en el puerto 4000`);
})
