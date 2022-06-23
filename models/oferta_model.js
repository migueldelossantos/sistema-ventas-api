const mongoose = require('mongoose');

const ofertaSchema = new mongoose.Schema({
    fechaCreacion:{
        type:Date,
        required:true,
        index:true
    },
    fechaFin:{
        type:Date,
        required:true,
        index:true
    },
    numPromociones:{
        type:Number,
        default:0
    },
    subTotal:{
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
    estatus:{
        type:String, // I = Inhabilitada, C = Cancelada, V = Vencida, A = Activa, E = Eliminada
        default:"A"
    }
});

module.exports = mongoose.model('Oferta',ofertaSchema);


/**
 * OfertaID
FechaCreacion
FechaFin
NumPromociones
SubTotal
IVA
IEPS
Total
Estatus
 */