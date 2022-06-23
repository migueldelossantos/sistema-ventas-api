const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioShema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        index:true
    },
    apellidoPaterno:{
        type:String,
        required:true
    },
    apellidoMaterno:{
        type:String
    },
    clave:{
        type:String,
        index:true
    },
    email:{
        type:String,
        required:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        default:"A"
    },
    fechaAlta:{
        type:Date,
        require:true,
        index:true
    },
    fechaActPass:{
        type:Date
    },
    rolID:{
        type: Schema.Types.ObjectId,
        ref:'rol',
        index:true
    }
});

//Add Index By Level
//usuarioShema.index({nombre:1,type:-1})

module.exports = mongoose.model('Usuario',usuarioShema);