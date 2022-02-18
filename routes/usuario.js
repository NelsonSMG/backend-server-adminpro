
var express = require('express');

// Inicializar
var app = express();

var Usuario = require('../models/usuario');


app.get('/', (request, response, next) => {

    Usuario.find({}, 'nombre email img role')
    .exec(
        (error, usuarios)=>{

            if (error){
                return response.status(500).json({
                    ok:false,
                    mensaje:'Error cargando usuarios',
                    errors: error
                });
            }

            response.status(200).json({
                ok:true,
                users: usuarios
            });
        }
    )
});

module.exports = app;