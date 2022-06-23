const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productoSchema = new mongoose.Schema({
    codigoBarras:{
        type:String,
        required:true,
        index:true
    },
    nombre:{
        type:String,
        required:true,
        index:true
    },
    nombreCorto:{
        type:String,
        required:true
    },
    precioCompra:{
        type:Number,
        default:0.0,
        required:true
    },
    precioVenta:{
        type:Number,
        default:0.0,
        required:true
    },
    tipoGanancia:{
        type:String, //P = Porcentaje, M = Monto
        default:'P'
    },
    ganancia:{
        type:Number,
        default:0.0
    },
    stock:{
        type:Number,
        default:0.0
    },
    stockMin:{
        type:Number,
        default:0.0
    },
    unidadMedida:{
        type:String,
        require:true
    },
    iva:{
        type:Number,
        default:0.0
    },
    ieps:{
        type:Number,
        default:0.0
    },
    imgPrincipal:{
        type:String
    },
    subCategoria:{
        type: Schema.Types.ObjectId,
        ref:'subCategoria'
    },
    estado:{
        type: String,
        default : 'A'
    }
});

module.exports = mongoose.model('Producto',productoSchema);