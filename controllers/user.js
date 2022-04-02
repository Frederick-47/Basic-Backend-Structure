const {response} = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');

const usersGet = async(req, res = response) => {


    const {limite = 10, desde = 0} = req.query;
    const query = {extado: true}
    

    const [total, usuarios]  = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const userPut = async(req, res) => {
    const {id} = req.params;
    const {_id, password, google,correo, ...resto} = req.body;

    //  TODO validar contra base de datos
    if(password){
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        usuario
    });
}

const userPost = async(req, res) => {

    

    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    //  Verify if the eamil exist 

    

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Save on DB
    await usuario.save();

    res.json({
        usuario
    });
}

const userDelete = async(req, res) => {

    const {id} = req.params;

    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json(usuario);
}

const userPatch = (req, res) => {
    res.json({
        mgs: 'patch API -controlador'
    });
}


module.exports ={
    usersGet,
    userPut,
    userPost,
    userDelete,
    userPatch

}