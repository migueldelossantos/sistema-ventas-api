const mongoose = require('mongoose');

const planFleteSchema = new mongoose.Schema({
    costoUnitario:{
        type:Number,
        default:0.0
    },
    costoPromo:{
        type:Number,
        default:0.0
    },
    numViajes:{
        type:Number,
        default: 0
    },
    fechaCaduca:{
        type:Date,
        required:true
    },
    descuento:{
        type:Number,
        default:0.0
    },
    promedioViaje:{
        type:Number,
        default:0.0
    },
    estado :{
        type:String, // A = Activo, E=Eliminado, I = Inactivo
        default : 'A'
    }
});

module.exports = mongoose.model('PlanFlete',planFleteSchema);
