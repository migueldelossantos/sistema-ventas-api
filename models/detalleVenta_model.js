const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detalleVentasSchema = new mongoose.Schema({
    cantidad:{
        type:Number,
        default:0.0
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
        default:0.0
    },
    descuento:{
        type:Number,
        default:0.0
    },
    ventaId:{
        type: Schema.Types.ObjectId,
        ref:'venta',
        index:true
    },
    productoId:{
        type: Schema.Types.ObjectId,
        ref:'producto',
        index:true
    }
});

module.exports = mongoose.model('DetalleVenta',detalleVentasSchema);
