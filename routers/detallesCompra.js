const express = require('express');

const DetalleCompra = require('../models/detalleCompra_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get Detalle Compra By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getDetalleCompraById(req.params.id)
    resultado.then(detalle=>{
        res.json({
            detalleCompra : detalle
        });
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

// Get By CompraId
ruta.get('/compra/:compraId',verificarToken,(req,res)=>{
    let resultado = getDetalleCompraByCompraId(req.params.id);
    resultado.then(detalles=>{
        res.json({
            detallesCompras : detalles
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
});

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearDetalleCompra(req.body);

    //Solo actualiza cantidad porque ya existe en la compra
    DetalleCompra.findOne({
        compraId    : body.compraId,
        productoId  : body.productoId
    },(error,detalle)=>{
        if(error) res.status(400).json({error:'Server Error'})
        if(detalle){
            let detalleComp = DetalleCompra.findByIdAndUpdate(detalle._id,{
                $set:{
                    cantidad : body.cantidad //Verificar aumento de cantidad
                }
            })
            
            res.json({
                detalleCompra : detalleComp
            });
        }else{
            //Crea nuevo si no existe
            resultado.then(detalle=>{
                res.json({
                    detalleCompra : detalle
                })
            }).catch(err=>{
                res.status(400).json({
                    error : err
                })
            });
        }
    });

})

// PUT
ruta.put('/:id',verificarToken,(req,req)=>{
    let resultado = actualizarDetalleCompra(req.params.id);
    resultado.then(detalle=>{
        ress.json({
            detalleCompra : detalle
        });
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
});

// Funcion Get By Id
async function getDetalleCompraById(id){
    let detalleCompra = await DetalleCompra.findById(id);
    return detalleCompra;
}

//Funcion Get By Compra Id
async function getDetalleCompraByCompraId(id){
    let detalleCompra = await DetalleCompra.find({
        compraId : id
    });
    return detalleCompra;
}

//Funcion Crear Detalle Compra
async function crearDetalleCompra(body){
    let detalleCompra = new DetalleCompra({
        cantidad        : body.cantidad,
        ieps            : body.ieps,
        iva             : body.iva,
        precioUnitario  : body.precioUnitario,
        descuento       : body.descuento,
        compraId        : body.compraId,
        productoId      : body.productoId
    });
    return await detalleCompra.save();
}

//Funcion Actualizar Detalle Compra
async function actualizarDetalleCompra(id){
    let detalleCompra = await DetalleCompra.findByIdAndUpdate(id,{
        $set : {
            cantidad        : body.cantidad,
            ieps            : body.ieps,
            iva             : body.iva,
            precioUnitario  : body.precioUnitario,
            descuento       : body.descuento
        }
    },{new: true});

    return detalleCompra;
}

module.exports = ruta;