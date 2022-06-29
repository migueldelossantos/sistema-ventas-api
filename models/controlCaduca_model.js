const mongoose = require('mongoose');

const Schema = mongoose;

const controlCaducaSchema = mongoose.Schema({
    productoId :{
        type : Schema.Types.ObjectId,
        rel:'producto',
        require : true,
        index : true
    },
    lote:{
        type : String,
        require : true
    },
    fechaCaduca:{
        type : Date,
        require : true,
        index : true
    },
    fechaCompra:{
        type : Date.now
    }
});

module.exports = mongoose.model('ControlCaduda',controlCaducaSchema);