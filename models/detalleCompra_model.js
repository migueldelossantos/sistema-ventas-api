const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detalleCompraSchema = new mongoose.Schema({
    cantidad:{
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
    precioUnitario:{
        type:Number,
        required:true
    },
    descuento:{
        type:Number, //Porcentaje
        default:0.0
    },
    compraId:{
        type: Schema.Types.ObjectId,
        ref:'compra',
        index:true
    },
    productoId:{
        type: Schema.Types.ObjectId,
        ref:'producto',
        index:true
    }
});

module.exports = mongoose.model('DetalleCompra',detalleCompraSchema);