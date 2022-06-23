const express = require('express');

const PlanFlete = require('../models/planFlete_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getPlanFleteById(req.body.id);
    resultado.then(plan=>{
        res.json({
            planFlete : plan
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

// Get Planes Activos
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = getPlanesActivos();
    resultado.then(planes=>{
        res.json({
            planesFlete : planes
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearPlanFlete(req.body);
    resultado.then(plan=>{
        res.json({
            planFlete : plan
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

// PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarPlanFleteById(req.body.id,req.body);
    resultado.then(plan=>{
        res.json({
            planFlete : plan
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//DELETE
ruta.delete('/:id',verificarToken,(req,res)=>{
    let resultado = eliminarPlanById(req.body.id);
    resultado.then(plan=>{
        res.json({
            planFlete : plan
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

// Funcion Get By Id
async function getPlanFleteById(id){
    let planFlete = await PlanFlete.findById(id);
    return planFlete;
}

//Funcion Get Planes Activos
async function getPlanesActivos(){
    let planes = await PlanFlete.findOne({
        estado : 'A'
    });
    return planes;
}

//Funcion Crear
async function crearPlanFlete(body){
    let planFlete = new PlanFlete({
        costoUnitario   : body.costoUnitario,
        costoPromo      : body.costoPromo,
        numViajes       : body.numViajes,
        fechaCaduca     : body.fechaCaduca,
        descuento       : body.descuento,
        promedioViajes  : body,promedioViajes
    });
    return await planFlete.save();
}

//Funcion Actualzar
async function actualizarPlanFleteById(id,body){
    let planFlete = await PlanFlete.findByIdAndUpdate(id,{
        $set:{
            costoUnitario   : body.costoUnitario,
            costoPromo      : body.costoPromo,
            numViajes       : body.numViajes,
            fechaCaduca     : body.fechaCaduca,
            descuento       : body.descuento,
            promedioViajes  : body,promedioViajes,
            estado          : body.estado
        }
    },{new:true});
    return planFlete;
}

//Funcion Eliminar Plan
async function eliminarPlanById(id){
    let planFlete = await PlanFlete.findByIdAndUpdate(id,{
        $set:{
            estado : 'E'
        }
    },{new:true});
    return planFlete;
}

module.exports = ruta;