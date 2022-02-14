// Requires
const { application } = require('express');
var express = require('express');
var mongoose = require('mongoose');


// Inicializar
var app = express();

// conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res)=>{
    if (err) throw err;
    console.log('Base de datos puerto 27017: \x1b[32m%s\x1b[0m', 'ONLINE');
})



//Rutas
app.get('/', (request, response, next) => {

    response.status(200).json({
        ok:true,
        mensaje:'Peticion realizada correctamente'
    });

})


// Escuchar peticiones
app.listen(5500, ()=>{
    console.log('Express server puerto 5500: \x1b[32m%s\x1b[0m', 'ONLINE');
})