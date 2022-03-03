var express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();

var Usuario = require('../models/usuario');

app.post('/', (req, res)=>{

    var body = req.body;

    Usuario.findOne({email: body.email}, (err, UsuarioDB)=>{

        if (err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al buscar usuarios',
                errors: err
            });
        }

        if (!UsuarioDB){
            return res.status(400).json({
                ok:false,
                mensaje:'Credenciales incorrectas - email',
                errors: err
            });
        }

        if ( !bcrypt.compareSync(body.password, UsuarioDB.password)){
            return res.status(400).json({
                ok:false,
                mensaje:'Credenciales incorrectas - password',
                errors: err
            });
        }

        //Crear Token!
        UsuarioDB.password = ':)';
        var token = jwt.sign({usuario: UsuarioDB}, SEED, {expiresIn: 14400}); //4 horas


        res.status(200).json({
            ok:true,
            usuario: UsuarioDB,
            token: token,
            id: UsuarioDB.id,
            //body: body
        });


    });
});

module.exports = app;