const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
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
        required:true
    }
});

module.exports = mongoose.model('Categoria',categoriaSchema);