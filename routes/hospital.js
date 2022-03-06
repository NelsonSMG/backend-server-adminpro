
var express = require('express');

// Inicializar
var app = express();

app.get('/', (request, response, next) => {

    response.status(200).json({
        ok:true,
        mensaje:'Peticion realizada correctamente - hospital'
    });

});

module.exports = app;