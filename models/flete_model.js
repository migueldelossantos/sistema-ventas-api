const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fleteSchema = new mongoose.Schema({
    clienteId:{
        type: Schema.Types.ObjectId,
        required:true,
        index:true
    },
    direccionId:{
        type: Schema.Types.ObjectId,
        required:true,
        index:true
    },
    viajesAcum:{
        type:Number,
        default:0.0
    },
    viajesPromo:{
        type:Number,
        default:0.0
    },
    planFletes:{
        type:String
    }
});

module.exports = mongoose.model('Flete',fleteSchema);

/**
 * ClienteId
DireccionId
ViajesAcumulados
ViajesPromo
 */