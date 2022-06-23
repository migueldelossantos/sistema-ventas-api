const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const compraSchema = new mongoose.Schema({
    fecha:{
        type:Date,
        default:Date.now,
        index:true
    },
    fechaPago:{
        type:Date,
        index:true
    },
    subTotal:{
        type:Number,
        required:true
    },
    ieps:{
        type:Number,
        default:0.0
    },
    iva:{
        type:Number,
        default:0.0
    },
    total:{
        type:Number,
        required:true
    },
    estado:{
        type:String, // A = Activa, C = Cancelada, P = Pendiente, E = Eliminada
        default:'A'
    },
    comentarios:{
        type:String
    },
    proveedorId:{
        type:Schema.Types.ObjectId,
        ref:'proveedor',
        index:true
    },
    usuarioId:{
        type: Schema.Types.ObjectId,
        ref:'usuario',
        index:true
    }
});

module.exports = mongoose.model('Compra',compraSchema);
