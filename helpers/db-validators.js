const Role = require('../models/role');
const usuario = require('../models/usuario');



const esRoleValido = async(role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El rol ${role} no está registrado en la Base de Datos`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await usuario.findByIdAndUpdate(id);
    if(!existeUsuario){
        throw new Error(`No existe el usuario con el id: ${id}`);
    }
}



module.exports = {
    esRoleValido,
    existeUsuarioPorId
}