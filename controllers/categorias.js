const {Categoria} = require('../models');


// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res) => {

    const query = {estado: true}

    const nombre = await Categoria.find(query).populate('usuario', 'nombre');


    res.status(200).json(nombre)
}

// obtenerCategoria

const obtenerCategoria = async(req, res) => {



    const {id} = req.params

    const nombre = await Categoria.findById(id);

    res.status(200).json(nombre)

}

const crearCategoria = async(req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    //  Generar la info a guardar
    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    //  Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

//  actualizarCategoria

const actualizarCategoria = async(req, res) => {

    const {id} = req.params;
    const newName = req.body.nombre.toUpperCase()

    if(!id & !newName){
        throw Error("no ha introducido correctamente el id ni el nombre")
    }


    const user = await Categoria.findByIdAndUpdate(id, {nombre: newName});

    res.status(201).json(user);

}

//  borrarCategoria - estado:false

const borrarCategoria = async(req, res) => {

    const {id} = req.params;
    const deleteUser = await Categoria.findByIdAndUpdate(id, {estado: false});

    res.status(200).json(deleteUser)
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}