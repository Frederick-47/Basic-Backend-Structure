const { Categoria } = require("../models");
const usuario = require("../models/usuario");


const validarIds = async(req, res, id, next) => {


    const existeUsuario = await usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`No existe el usuario con el id: ${id}`);
    }

    next();
}


module.exports = {
    validarIds
}