
const dbValidators   = require('./db-validators')
const generarJWT     = require('./generar-jwt')
const googleVerify   = require('./google-verify')
const emailValidator = require('./email-validator')
const subirArchivo   = require('./subir-archivo')


module.exports= {

    ...dbValidators,   
    ...generarJWT,     
    ...googleVerify,   
    ...emailValidator, 
    ...subirArchivo,   
}