var express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

// Inicializar
var app = express();

var Usuario = require('../models/usuario');

// GET

app.get('/', (request, response, next) => {

    var desde = request.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nombre email role')
    .skip(desde)
    .limit(3)
    .exec(
        (error, usuarios)=>{

            if (error){
                return response.status(500).json({
                    ok:false,
                    mensaje:'Error cargando usuarios',
                    errors: error
                });
            }

            Usuario.count({}, (err, conteo) => {
                response.status(200).json({
                    ok:true,
                    users: usuarios,
                    total: conteo
                });
            })

        }
    )
});

// ==========================================
// Actualizar usuario
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }


        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});

// POST
app.post('/', (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
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
            usuario: usuarioGuardado,
            usuarioTokem: req.usuario
        });

    });

});


//Delete
app.delete('/:id', mdAutenticacion.verificaToken, (req, res)=>{
    
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{

            if (err){
                return res.status(500).json({
                    ok:false,
                    mensaje:'Error al borrar usuario',
                    errors: err
                });
            }

            if (!usuarioBorrado){
                return res.status(400).json({
                    ok:false,
                    mensaje:'No existe usuario con ese id',
                    errors: {message: 'No existe usuario con ese id'}
                });
            }

            res.status(200).json({
                ok:true,
                usuario: usuarioBorrado
            });

    });

});


module.exports = app;