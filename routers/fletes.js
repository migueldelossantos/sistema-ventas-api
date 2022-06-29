const express = require('express')

const Flete = require('../models/flete_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id'.verificarToken,(req,res)=>{
    let resultado = getFleteById(req.params.id);
    resultado.then(fle=>{
        res.json({
            flete : fle
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Get By Cliente Id
ruta.get('/cliente/:id',verificarToken,(req,res)=>{
    let resultado = getFleteByClienteId(req.params.id);
    resultado.then(fle=>{
        res.json({
            flete : fle
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearFlete(req.body);
    resultado.then(fle=>{
        res.json({
            flete : fle
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarFlete(req.params.id,req.body);
    resultado.then(fle=>{
        res.json({
            flete : fle
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Funcion Get By Id
async function getFleteById(id){
    let flete = await Flete.findById(id);
    return flete;
}

//Funcion Get By Cliente Id
async function getFleteByClienteId(id){
    let flete = await Flete.findOne({
        clienteId : id
    });
    return flete;
}

//Funcion Crear
async function crearFlete(body){
    let flete = new Flete({
        clienteId   : body.clienteId,
        direccionId : body.direccionId,
        viajesAcum  : body.viajesAcum,
        viajesPromo : body.viajesPromo,
        planFletes  : body.planFletes
    });
    return await flete.save();
}

//Funcion Actualizar
async function actualizarFlete(id,body){
    let flete = await Flete.findByIdAndUpdate(id,{
        $set:{
            viajesAcum  : body.viajesAcum,
            viajesPromo : body.viajesPromo,
            planFletes  : body.planFletes
        }
    },{new:true});
    return flete;
}

module.exports = ruta;