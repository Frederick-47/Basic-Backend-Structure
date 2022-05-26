const { Producto } = require('../models');
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


const existeProductoPorId = async(id) => {

    //  Verificar si el correo existe
    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error(`El id no existe ${id}`)
    }
}

//  Validar Colecciones Permitidas 

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)
    }

    return true;
}


module.exports = {
    esRoleValido,
    existeUsuarioPorId,
    existeProductoPorId,
    coleccionesPermitidas
}