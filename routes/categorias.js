const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarIds } = require('../middlewares/validar-id');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


//  Obtener todas las categorias
router.get('/',[ validarCampos], obtenerCategorias)

//  Obtener una categoria por id - público
router.get('/:id', [
    check('id', 'esto no es un id válido').isMongoId(),
    check('id').custom(validarIds),
    validarCampos], obtenerCategoria)

//  Crear categoria - privado - cualquier persona con un token válido
router.post('/', [validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);


//  Actualizar - privado - cualquiera con token válido
router.put('/:id', [validarJWT,check('id').custom(validarIds), validarCampos], actualizarCategoria)

//  Borrar un categoria - Admin
router.delete('/:id', [validarJWT,esAdminRole,check('id', 'esto no es un id válido').isMongoId(),check('id').custom(validarIds),validarCampos], borrarCategoria)



module.exports = router;