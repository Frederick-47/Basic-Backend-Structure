
const {Router} = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProductoById, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorId } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarIds } = require('../middlewares/validar-id');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/', [validarCampos], obtenerProductos)


router.get('/:id', [validarCampos], obtenerProductoById)

router.post('/', [validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos
    ], crearProducto)

router.put('/:id', [
    validarJWT,
     validarIds 
    ], actualizarProducto)


router.delete('/:id', [
    validarJWT, 
    check('id').custom(existeProductoPorId), 
    validarCampos 
    ], borrarProducto )

module.exports = router;