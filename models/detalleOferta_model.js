const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detalleOfertaSchema = new mongoose.Schema({
    ofertaId:{
        type: Schema.Types.ObjectId,
        ref:'oferta',
        index:true
    },
    productoId:{
        type: Schema.Types.ObjectId,
        ref:'producto',
        index:true
    },
    porcentajeDesc:{
        type:Number,
        default:0.0
    },
    cantidad:{
        type:Number,
        default:0.0
    },
    precioUnitario:{
        type:Number,
        default:0.0
    }
});

module.exports = mongoose.model('DetalleOferta',detalleOfertaSchema);
