const mongoose = require('mongoose');

const usuarioShema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    password:{
        type:password,
        required:true
    },
    estado:{
        type:String,
        default:"Activo"
    }
});

module.exports = mongoose.model('Usuario',usuarioShema);