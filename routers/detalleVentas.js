const express = require('express');

const DetalleOferta = require('../models/detalleVenta_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getDetalleOfertaById(req.body.id);
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

//Get By Oferta Id
ruta.get('/ofertaId/:id',verificarToken,(req,res)=>{
    let resultado = getDetallesByOfertaId(req.body.id);
    resultado.then(detalles=>{
        res.json({
            detallesOferta : detalles
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearDetalleVenta(req.body);

    DetalleVenta.findOne({
        ventaId     : body.ventaId,
        productoId  : body.productoId
    },(error,detalle)=>{
        if(error) res.status(400).json({error:'Server Error'});
        if(detalle){
            let detalleVent = DetalleVenta.findByIdAndUpdate(detalle._id,{
                $set:{
                    cantidad : body.cantidad
                }
            })
            res.json({
                detalleVenta : detalleVent
            })
        }
    });

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

//PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarDetalleOferta(req.body.id);
    resultado.then(detalle=>{
        res.json({
            detalleOferta : detalle
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
})

//Funcion Get By Id
async function getDetalleOfertaById(id){
    let detalle = await DetalleOferta.findById(id);
    return detalle;
}

//Funcion Get By OfertaId
async function getDetallesByOfertaId(id){
    let detalles = await DetalleOferta.find({
        ofertaId : id
    });
    return detalles;
}

//Funcion Crear Detalle
async function crearDetalleVenta(body){
    let detalle = new DetalleOferta({
        cantidad    : body.cantidad,
        ieps        : body.ieps,
        iva         : body.iva,
        precioUnitario : body.precioUnitario,
        descuento   : body.descuento,
        ventaId     : body.ventaId,
        productoId  : body.productoId 
    })
    return await detalle.save();
}

//Funcion Actualizar
async function actualizarDetalleOferta(id,body){
    let detalle = await DetalleOferta.findByIdAndUpdate(id,{
        $set:{
            cantidad    : body.cantidad,
            ieps        : body.ieps,
            iva         : body.iva,
            precioUnitario : body.precioUnitario,
            descuento   : body.descuento
        }
    },{new:true})
    return detalle;
}

module.exports = ruta;