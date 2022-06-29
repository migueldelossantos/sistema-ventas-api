const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cajaSchema = new mongoose.Schema({
    tipoCaja:{
        type:String, //Princiapl : P, Atencion al Publico: AP, Administrativa: A
        required:true,
        index : true
    },
    estado:{
        type:String, //A = Activa, D = Cancelada, I = Inhabilitada, C = Cerrada
        default : 'A'
    },
    saldo:{
        type:Number,
        default: 0.0
    },
    efectivo:{
        type:Number,
        default: 0.0
    },
    cambio:{
        type:Number,
        default:0.0
    },
    usuarioId:{
        type:Schema.Types.ObjectId,
        ref:'usuario',
        index:true
    }
});

module.exports = mongoose.model('Caja',cajaSchema);