const express = require('express');

const Venta = require('../models/venta_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getVentaById(req.body.id);
    resultado.then(vent=>{
        res.json({
            venta : vent
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Get By Fecha
ruta.get('/:fechaIni/:fechaFin',verificarToken,(req,res)=>{
    let resultado = getVentasByFecha(req.body.fechaIni,req.body.fechaFin);
    resultado.then(vents=>{
        res.json({
            ventas : vents
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearVenta(req.body);
    resultado.then(vent=>{
        res.json({
            venta : vent
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarVenta(req.body.id,req.body);
    resultado.then(vent=>{
        res.json({
            venta : vent
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Delete
ruta.delete('/:id',verificarToken,(req,res)=>{
    let resultado = eliminarVenta(req.body.id);
    resultado.then(vent=>{
        res.json({
            venta : vent
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Funcion Get By Id
async function getVentaById(id){
    let venta = await Venta.findById(id);
    return venta;
}

//Funcion Get By Fecha
async function getVentasByFecha(fechaIni,fechaFin){
    let ventas = await Venta.find({
        fecha : {
            $gte : fechaIni,
            $lte : fechaFin
        }
    });
    return ventas;
}

//Funcion Crear Venta
async function crearVenta(body){
    let venta = new Venta({
        numero      : body.numero,
        fechaPago   : body.fechaPago,
        subTotal    : body.subTotal,
        descuento   : body.descuento,
        iva         : body.iva,
        ieps        : body.ieps,
        total       : body.total,
        usuarioId   : body.usuarioId,
        clienteId   : body.clienteId
    });
    return await venta.save();
}

//Funcion Actualizar
async function actualizarVenta(id,body){
    let venta = await Venta.findByIdAndUpdate(id,{
        $set:{
            numero      : body.numero,
            fechaPago   : body.fechaPago,
            subTotal    : body.subTotal,
            descuento   : body.descuento,
            iva         : body.iva,
            ieps        : body.ieps,
            total       : body.total,
            estado      : body.estado
        }
    },{new:true});
    return venta;
}

//Funcion Eliminar
async function eliminarVenta(id){
    let venta = await Venta.findByIdAndUpdate(id,{
        $set:{
            estado : 'E'
        }
    },{new:true});
    return venta;
}

module.exports = ruta;