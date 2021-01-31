/**
 * Events Routes
 * /api/events
 */

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const {actualizarEvento, crearEvento, eliminarEvento, getEventos} = require('../controllers/events');
const validarJWT = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//Todas las rutas deben usar el middleware validarJWT
router.use(validarJWT);

//obtener eventos
router.get('/', getEventos);

//crear un evento
router.post('/',
            [
                check('title', 'El titulo es obligatorio').not().isEmpty(),
                check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
                check('start', 'Fecha de finalización es obligatoria').custom( isDate ),
                validarCampos
            ],
            crearEvento
        );

//Actualizar un evento
router.put('/:id',
            [
                check('title', 'El titulo es obligatorio').not().isEmpty(),
                check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
                check('start', 'Fecha de finalización es obligatoria').custom( isDate ),
                validarCampos
            ],
            actualizarEvento);

//Borrar un evento
router.delete('/:id', eliminarEvento);

module.exports = router;