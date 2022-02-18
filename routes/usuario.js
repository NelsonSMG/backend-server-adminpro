
var express = require('express');

// Inicializar
var app = express();

var Usuario = require('../models/usuario');

// GET

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


// POST
app.post('/', (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        img: body.img,
        role: body.role
    });

    usuario.save( ( err, usuarioGuardado )=>{
        if (err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error cargando usuarios',
                errors: err
            });
        }

        res.status(201).json({
            ok:true,
            usuario: usuarioGuardado
        });

    });

});


module.exports = app;