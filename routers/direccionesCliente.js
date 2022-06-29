const express = require('express');

const DireccionCliente = require('../models/direccionCliente_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getDireccionById(req.params.id);
    resultado.then(direc=>{
        res.json({
            direccion : direc
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
})

//Get By Cliente Id
ruta.get('/cliente/:id',verificarToken,(req,res)=>{
    let resultado = getDireccionByClienteId(req.params.id);
    resultado.then(direcs=>{
        res.json({
            dirreciones : direcs
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//POST
ruta.post('/'.verificarToken,(req,res)=>{
    let resultado = crearDireccionCliente(req.body);
    resultado.then(direc=>{
        res.json({
            direccion : direc
        });
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarDireccionCliente(req.params.id,req.body);
    resultado.then(direc=>{
        res.json({
            direccion : direc
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

// Funcion Get By Cliente Id
async function getDireccionByClienteId(id){
    let dirreciones = await DireccionCliente.findOne({
        clienteId : id
    });
    return dirreciones;
}

//Funcion Get By Id
async function getDireccionById(id){
    let direccion = await DireccionCliente.findById(id);
    return direccion;
}

//Funcion Crear
async function crearDireccionCliente(body){
    let direccion = new DireccionCliente({
        clienteId       : body.clienteId,
        estado          : body.estado,
        municipio       : body.municipio,
        localidad       : body.localidad,
        colonia         : body.colonia,
        codigoPostal    : body.codigoPostal,
        numExt          : body.numExt,
        numInt          : body.numInt,
        lote            : body.lote,
        manzana         : body.manzana,
        longitud        : body.longitud,
        latitud         : body.latitud
    });
    return await direccion.save();
}

//Funcion Actualizar
async function actualizarDireccionCliente(id,body){
    let direccion = await DireccionCliente.findByIdAndUpdate(id,{
        $set:{
            estado          : body.estado,
            municipio       : body.municipio,
            localidad       : body.localidad,
            colonia         : body.colonia,
            codigoPostal    : body.codigoPostal,
            numExt          : body.numExt,
            numInt          : body.numInt,
            lote            : body.lote,
            manzana         : body.manzana,
            longitud        : body.longitud,
            latitud         : body.latitud
        }
    },{new:true});
    return direccion;
}

module.exports = ruta;