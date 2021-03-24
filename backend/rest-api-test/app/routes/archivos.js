const { Router } = require('express');
const { cargarArchivo } = require('../controllers/archivos');
const router = Router();

router.post('/cargarArchivo', cargarArchivo);

module.exports = router;