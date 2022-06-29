const express = require('express');

const Proveedor = require('../models/proveedor_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getProveedorById(req.params.id);
    resultado.then(prov=>{
        res.json({
            proveedor : prov
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Get All
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = getProvedoresAll();
    resultado.then(provs=>{
        res.json({
            proveedores : provs
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearProveedor(req.body);
    resultado.then(prov=>{
        res.json({
            proveedor : prov
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarProveedor(req.params.id);
    resultado.then(prov=>{
        res.json({
            proveedor : prov
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
})

//Funcion Get By Id
async function getProveedorById(id){
    let proveedor = await Proveedor.findById(id);
    return proveedor;
}

//Funcion Get All
async function getProvedoresAll(){
    let proveedores = await Proveedor.find();
    return proveedores;
}

//Funcion Crear
async function crearProveedor(body){
    let proveedor = new Proveedor({
        nombre      : body.nombre,
        alias       : body.nombre,
        direccion   : body.direccion,
        telFijo     : body.telFijo,
        celular     : body.celular,
        email       : body.email,
        frecVisitaDias : body.frecVisitaDias,
        fechaProxVisita : body,fechaProxVisita
    })
    return await proveedor.save();
}

//Funcion Actualizar
async function actualizarProveedor(id,body){
    let proveedor = await Proveedor.findByIdAndUpdate(id,{
        $set:{
            nombre      : body.nombre,
            alias       : body.nombre,
            direccion   : body.direccion,
            telFijo     : body.telFijo,
            celular     : body.celular,
            email       : body.email,
            frecVisitaDias : body.frecVisitaDias,
            fechaProxVisita : body,fechaProxVisita
        }
    });
    return proveedor;
}

module.exports = ruta;