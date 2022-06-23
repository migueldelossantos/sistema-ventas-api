const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const direccionClienteSchema = new mongoose.Schema({
    clienteId:{
        type: Schema.Types.ObjectId,
        index: true
    },
    estado:{
        type:String
    },
    municipio:{
        type:String
    },
    localidad:{
        type:String
    },
    colonia:{
        type:String
    },
    codigoPostal:{
        type:String
    },
    numExt:{
        type:String
    },
    numInt:{
        type:String
    },
    lote:{
        type:String
    },
    manzana:{
        type:String
    },
    longitud:{
        type:String
    },
    latitud:{
        type:String
    }
});

module.exports = mongoose.model('DireccionCliente',direccionClienteSchema);
