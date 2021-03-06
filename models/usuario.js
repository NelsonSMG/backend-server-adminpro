var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

var usuarioSchema = new Schema({

    nombre: {type: String, required: [true, 'El nombre es necesario']},
    email: {type: String, required: [true, 'El correo es necesario']},
    password: {type: String, required: [true, 'La contraseña es necesaria']},
    img: {type: String, required: false},
    role: {type: String, required: false, default: 'USER_ROLE', enum: rolesValidos},

});

//usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

module.exports = mongoose.model('Usuario', usuarioSchema);