const {Router} = require('express');
const { check } = require('express-validator');
const { usersGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');
const { esRoleValido, existeUsuarioPorId } = require('../helpers/db-validators');
const existeEmail = require('../helpers/email-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.get('/',usersGet);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos

],userPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 letras').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    // check('role', 'No es un rol válido ').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    check('correo').custom(existeEmail),
    validarCampos,



] ,userPost);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], userDelete);

router.patch('/', userPatch);

module.exports = router;