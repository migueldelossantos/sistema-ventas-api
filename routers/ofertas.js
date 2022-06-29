const express = require('express');

const Oferta = require('../models/oferta_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getOfertaById(req.params.id);
    resultado.then(ofer=>{
        res.json({
            oferta : ofer
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Get All
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = getOfertasActivas();
    resultado.then(ofers=>{
        res.json({
            ofertas : ofers
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearOferta(req.body);
    resultado.then(ofer=>{
        res.json({
            oferta : ofer
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarOferta(req.params.id,req.body);
    resultado.then(ofer=>{
        res.json({
            oferta : ofer
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//DELETE
ruta.delete('/:id',verificarToken,(req,res)=>{
    let resultado = eliminarOfertaById(req.params.id);
    resultado.then(ofer=>{
        res.json({
            oferta : ofer
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Funcion Get By Id
async function getOfertaById(id){
    let oferta = await Oferta.findById(id);
    return oferta;
}

//Funcion Get Ofertas Activas
async function getOfertasActivas(){
    let ofertas = await Ofertta.findOne({
        estado : 'A'
    });
    return ofertas;
}

//Funcion Crear
async function crearOferta(body){
    let oferta = new Oferta({
        fechaFin    : body.fechaFin,
        numPromosiones : body.numPromosiones,
        subTotal    : body.subTotal,
        iva         : body.iva,
        ieps        : body.ieps,
        total       : body.total
    })
    return await oferta.save();
}

//Funcion Actualizar
async function actualizarOferta(id,body){
    let oferta = await Oferta.findByIdAndUpdate(id,{
        $set:{
            fechaFin    : body.fechaFin,
            numPromosiones : body.numPromosiones,
            subTotal    : body.subTotal,
            iva         : body.iva,
            ieps        : body.ieps,
            total       : body.total,
            estado      : body.estado
        }
    },{new:true});
    return oferta;
}

//Funcio DELETE
async function eliminarOfertaById(id){
    let oferta = await Oferta.findByIdAndUpdate(id,{
        $set:{
            estado : 'E'
        }
    },{new:true});
    return oferta;
}

module.exports = ruta;