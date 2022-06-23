const mongoose = require("mongoose");

const rolSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        index:true
    },
    descripcion:{
        type:String
    },
    clave:{
        type:String,
        required:true,
        index:true
    }
});

module.exports = mongoose.model('Rol',rolSchema);