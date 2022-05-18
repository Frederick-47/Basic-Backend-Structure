const { Producto, Categoria } = require("../models");

//  Obtener los Productos 

const obtenerProductos = async(req, res) => {

    const query = {estado: true}

    const nombre = await Producto.find(query).populate('usuario', 'nombre');


    res.status(200).json(nombre)

}

//  Obtener un Producto por Id

const obtenerProductoById = async(req, res) => {

    const {id} = req.params

    const nombre = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');
                            

    res.status(200).json(nombre)

}



//  Crear un producto



const crearProducto = async(req, res) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoria = req.body.categoria.toUpperCase();


    const productoDB = await Producto.findOne({nombre});
    const categoriaData = await Categoria.findOne({nombre: categoria})



    if(productoDB) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        })
    }

    //  Generar la info a guardar
    const data = {
        nombre, 
        usuario: req.usuario._id,
        categoria: categoriaData
    }

    const producto = new Producto(data);

    //  Guardar DB
    await producto.save();

    res.status(201).json(producto);
}


const actualizarProducto = async(req, res) => {

    const {id} = req.params;
    const newName = req.body.nombre.toUpperCase()

    if(!id & !newName){
        throw Error("no ha introducido correctamente el id ni el nombre")
    }


    const user = await Producto.findByIdAndUpdate(id, {nombre: newName});

    res.status(201).json(user);
}


//  borrarProducto

const borrarProducto = async( req, res ) => {
    
    const {id} = req.params;
    const deleteProducto = await Producto.findByIdAndUpdate(id, {estado: false});

    res.status(200).json(deleteProducto)
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoById,
    actualizarProducto,
    borrarProducto
}