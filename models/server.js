const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../database/config');


class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            users: '/api/users',
            categories: '/api/categories',
            productos: '/api/productos',
        }
        

        //  Conectar a base de datos
        this.conectarDB();
        //  Middlewares 
        this.middlewares();

        //  Rutas de mi aplicacion
        this.routes();
        
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // Lectura y parseo del body
        this.app.use(express.json());
        //  CORS
        this.app.use(cors());
        //  Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){

        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.users, require('../routes/user'))
        this.app.use(this.paths.categories, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))


    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port )
        })
    }
}

module.exports = Server;