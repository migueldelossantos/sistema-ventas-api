const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ventaSchema = new mongoose.Schema({
    numero:{
        type:Number
    },
    fecha:{
        type:Date,
        default:Date.now,
        index:true
    },
    fechaPago:{
        type:Date
    },
    subTotal:{
        type:Number,
        default:0.0
    },
    decuento:{
        type:Number,
        default:0.0
    },
    iva:{
        type:Number,
        default:0.0
    },
    ieps:{
        type:Number,
        default:0.0
    },
    total:{
        type:Number,
        default:0.0
    },
    estado:{
        type:String, //A = Activa, P = Pendiente, C = Cancelada, E = En Cola
        default:'A',
        index:true
    },
    usuarioId:{
        type: Schema.Types.ObjectId,
        index:true
    },
    clienteId:{
        type: Schema.Types.ObjectId,
        index:true
    }
});

module.exports = mongoose.model('Venta',ventaSchema);
