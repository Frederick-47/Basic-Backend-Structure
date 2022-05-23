const { response } = require("express");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");
const {ObjectId} = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];


const buscarUsuarios = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    console.log(esMongoID)

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [usuario]: []
        });
    }else {
        const regex = new RegExp(termino, 'i');

        const usuarios = await Usuario.find({
            $or: [{nombre: regex }, {correo: regex}],
            $and: [{estado:true}]
        });
        
        res.json({
            results: usuarios
    })
    }

    
}


const buscarCategorias = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        res.json({
            results: (categoria) ? [categoria]: []
        })
    }else {
        const regex = new RegExp(termino, 'i');

        const categorias = await Categoria.find({nombre: regex});

        res.json({results: categorias})
    }
    
    


    
}


const buscarProductos = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const producto = await Producto.findById(termino);
        res.json({
            results: (producto) ? [producto]: []
        })
    }else {
        const regex = new RegExp(termino, 'i');

        const productos = await Producto.find({nombre: regex});

        res.json({results: productos})
    }
}





const buscar = (req, res) => {

    const {coleccion, termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
        break;

        default: 
            res.status(500).json({
                msg: 'Esta busqueda aún no ha sido creada'
            })
            break;

    }

    
}


module.exports = {
    buscar
}