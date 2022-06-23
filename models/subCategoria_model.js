const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subCategoriaSchema = new mongoose.Schema({
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
    },
    categoriaId:{
        type: Schema.Types.ObjectId,
        ref:'categoria',
        index:true
    }
});

module.exports = mongoose.model('SubCategoria',subCategoriaSchema);
