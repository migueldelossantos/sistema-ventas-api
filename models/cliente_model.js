const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        index:true
    },
    apellidoPat:{
        type:String,
        required:true,
        index:true
    },
    apellidoMat:{
        type:String
    },
    nombreCompleto:{
        type:String,
        index:true
    },
    RFC:{
        type:String,
        index:true
    },
    telFijo:{
        type:String
    },
    celular:{
        type:String
    },
    email:{
        type:String
    },
    estado:{
        type:String,
        default:'A'
    },
    numCompras:{
        type:Number,
        default : 0
    }
});

module.exports = mongoose.model('Cliente',clienteSchema);
