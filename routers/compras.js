const express = require('express');

const Compra = require('../models/compra_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getCompraById(req.params.id);
    resultado.then(comp=>{
        res.json({
            compra : comp
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Get By Fecha
ruta.get('/fechas',verificarToken,(req,res)=>{
    let resultado = getComprasByFecha(req.params.fechaIni,req.params.fechaFin);
    resultado.then(compras=>{
        res.json({
            compras
        });
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
})

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let body = req.body;
    let resultado = crearCompra(body);
    resultado.then(comp=>{
        res.json({
            compra : comp
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
});

//PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarCompra(req.params.id,req.body);
    resultado.then(comp=>{
        res.json({
            compra : comp
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
});

//DELETE
ruta.delete('/:id',verificarToken,(req,res)=>{
    let resultado = eliminarCompra(req.params.id);
    resultado.then(comp=>{
        res.json({
            compra : comp
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
});

//Funcion Get Compras By Fecha
async function getComprasByFecha(fechaIni,fechaFin){
    let compras = await Compra.find({
        fecha : {
            $gte: fechaIni,
            $lte: fechaFin
        }
    });
    return compras;
}

//Funcion Get Compra By Id
async function getCompraById(id){
    let compra = await Compra.findById(id);
    return compra;
}

//Funcion Crear
async function crearCompra(body){
    let compra = new Compra({
       fechaPago    : body.fechaPago,
       subTotal     : body.subTotal,
       ieps         : body.ieps,
       iva          : body.iva,
       total        : body.total,
       comentarios  : body.comentarios,
       proveedorId  : body.proveedorId,
       usuarioId    : body.usuarioId
    });

    return await compra.save();
}

//Funcion Actualizar
async function actualizarCompra(id,body){
    let compra = await Compra.findByIdAndUpdate(id,{
        $set:{
            fechaPago   : body.fechaPago,
            subTotal    : body.subTotal,
            ieps        : body.ieps,
            iva         : body.iva,
            total       : body.total,
            comentarios : body.comentarios
        }
    },{new:true})

    return compra;
}

//Funcion Eliminar Compra
async function eliminarCompra(id){
    let compra = await Compra.findByIdAndUpdate(id,{
        $set:{
            estado : 'E'
        }
    });
    return compra;
}

module.exports = ruta;