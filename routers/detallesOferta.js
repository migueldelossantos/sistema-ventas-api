const express = require('express');

const DetalleOferta = require('../models/detalleOferta_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//GET By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getDetalleOfertaById(req.params.id);
    resultado.then(detalle=>{
        res.json({
            detalleOferta : detalle
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

// GET By Oferta Id
ruta.get('/oferta/:id',verificarToken,(req,res)=>{
    let resultado = getDetalleByOfertaId(req.params.id);
    resultado.then(detalles=>{
        res.json({
            detallesOferta : detalles
        });
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
})

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearDetalleOferta(req.body);

    DetalleOferta.findOne({
        ofertaId : body.ofertaId,
        productoId : body.productoId
    },(error,detalle)=>{
        if(error) res.status(400).json({error:'Server Error.!'});
        if(detalle){
            let detalleOfer = DetalleOferta.findByIdAndUpdate(detalle._id,{
                $set:{
                    cantidad : body.cantidad
                }
            });
            
            res.json({
                detalleOferta : detalleOfer
            });
        }else{
            //Crea Nuevo detalle si no existe
            resultado.then(detalle=>{
                res.json({
                    detalleOferta : detalle
                });
            }).catch(err=>{
                res.status(400).json({
                    error : err
                })
            });
        }
    });
})

//PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarDetalleOferta(req.params.id);
    resultado.then(detalle=>{
        res.json({
            detalleOferta : detalle
        });
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
});

//Funcion Get By Id
async function getDetalleOfertaById(id){
    let detalle = await DetalleOferta.findById(id);
    return detalle;
}

//Funcion Get By OfertaId
async function getDetalleByOfertaId(id){
    let detalles = await DetalleOferta.find({
        ofertaId : id
    });
    return detalles;
}

//Funcion Crear Detalle
async function crearDetalleOferta(body){
    let detalle = new DetalleOferta({
        ofertaId    : body.ofertaId,
        productoId  : body.productoId,
        porcentajeDesc : body.porcentajeDesc,
        cantidad    : body.cantidad,
        precioUnitario : body.precioUnitario
    });
    return await detalle.save();
}

//Funcion Actualizar
async function actualizarDetalleOferta(id){
    let detalle = await DetalleOferta.findByIdAndUpdate(id,{
        $set:{
            porcentajeDesc  : body.porcentajeDesc,
            cantidad        : body.cantidad,
            precioUnitario  : body.precioUnitario
        }
    },{new:true});
    return detalle;
}

module.exports = ruta;