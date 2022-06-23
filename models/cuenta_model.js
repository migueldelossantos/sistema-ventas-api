const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cuentaSchema = new mongoose.Schema({
    fechaApertura:{
        type:Date,
        default: Date.now,
        index:true
    },
    saldo:{
        type:Number,
        default:0.0
    },
    saldoCredito:{
        type:Number,
        default:0.0
    },
    saldoBloq:{
        type:Number,
        default:0.0
    },
    saldoIniMes:{
        type:Number,
        default:0.0
    },
    saldoElectronico:{
        type:Number,
        default:0.0
    },
    abonosMes:{
        type:Number,
        default:0.0
    },
    cargosMes:{
        type:Number,
        default:0.0
    },
    estado:{
        type:String, // A:Activa, C:Cancelada, B:Bloqueada, E:Eliminada
        default:'A'
    },
    clienteId:{
        type: Schema.Types.ObjectId,
        ref:'cliente',
        index:true
    }
});

module.exports = mongoose.model('Cuenta',cuentaSchema);
