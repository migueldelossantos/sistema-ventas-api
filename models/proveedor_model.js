const  mongoose = require("mongoose")

const proveedorSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        index:true
    },
    alias:{
        type:String
    },
    direccion:{
        type:String
    },
    telFijo:{
        type:String
    },
    celular:{
        type:String
    },
    email:{
        type:String
    },
    frecVisitaDias:{ //Frecuencia de Visitas en días
        type:Number
    },
    fechaProxVisita:{
        type:Date
    }
});

module.exports = mongoose.model('Proveedor',proveedorSchema);