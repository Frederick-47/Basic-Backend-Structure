const Usuario = require("../models/usuario")


const existeEmail = async( correo = '' ) => {
    const email = await Usuario.findOne({correo});

    if(email){
        throw new Error('Ya existe el correo en la base de datos')
    }

}

module.exports = existeEmail