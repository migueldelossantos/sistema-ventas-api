const express = require("express");

const Caja = require('../models/caja_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//GET Cajas
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = listarCajas();
    resultado.then(cajas=>{
        res.json(cajas);
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    })
});

//GET Caja By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getCaja(req.params.id);
    resultado.then(caja=>{
        res.json(caja)
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    })
});

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let body = req.body;
    let resultado = crearCaja(req.body);
    resultado.then(caja=>{
        res.json({
            caja : caja
        }).catch(err=>{
            res.status(400).json({
                error : err
            });
        });
    })
});

// PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarCaja(req.params.id,req.body);
    resultado.then(caja=>{
        res.json({
            caja : caja
        });
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    })
});

//Funcion Listar Cajas
async function listarCajas(){
    let cajas =  await Caja.find();
    return cajas;
}

//Funcion Obtener Caja by Id
async function getCaja(id){
    let caja = await Caja.findById(id);
    return caja;
}

//Funcion Crear Caja
async function crearCaja(body){
    let caja = new Caja({
        tipoCaja : body.tipoCaja,
        usuario : body.usuarioId
    });

    return await caja.save();
};

//Funcion Actualiza Caja
async function actualizarCaja(id,body){
    let caja = await Caja.findByIdAndUpdate(id,{
      $set:{
        tipoCaja  : body.tipoCaja,
        estado    : body.estado,
        saldo     : body.saldo,
        efectivo  : body.efectivo,
        cambio    : body.cambio,
        usuarioId     : body.usuarioId   
      }
    },{new:true});

    return caja;
}

module.exports = ruta;