const {Router} = require('express');
const { usersGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');

const router = Router();


router.get('/',usersGet);

router.put('/:id',userPut);

router.post('/',userPost);

router.delete('/', userDelete);

router.patch('/', userPatch);

module.exports = router;