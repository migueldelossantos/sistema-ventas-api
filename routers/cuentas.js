const express = require('express');

const Cuenta = require('../models/cuenta_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get Cuenta By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getCuentaById(req.params.id);
    resultado.then(cue=>{
        res.json({
            cuenta : cue
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
})

//Get Cuenta By Cliente Id
ruta.get('/cliente/:id',verificarToken,(req,res)=>{
    let resultado = getCuentaByClienteId(req.params.id);
    resultado.then(cue=>{
        res.json({
            cuenta : cue
        });
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let body = req.body;
    let resultado = crearCuenta(body);

    Cuenta.findOne({clienteId : body.clienteId},(error,cuenta)=>{
        if(error){
            return res.status(400).json({error:'Server Error'});
        }
        if(cuenta){
            res.status(400).json({
                message : 'El Usuario ya tiene registrada una cuenta.'
            });
        }
    });

    //Da de alta si no encuentra cliente repetido
    resultado.then(cue=>{
        res.json({
            cuenta : cue
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
});

//PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarCuenta(req.params.id,req.body);
    resultado.then(cue=>{
        res.json({
            cuenta : cue
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
})

//DELETE Cuenta
ruta.delete('/:id',verificarToken,(req,res)=>{
    let resultado = eliminarCuenta(req.params.id);
    resultado.then(cue=>{
        res.json({
            cuenta : cue
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Funcion Obtener Cuenta By Id
async function getCuentaById(id){
    let cuenta = await Cuenta.findById(id);
    return cuenta;
}

//Funcion Obtener Cuenta By Cliente Id
async function getCuentaByClienteId(id){
    let cuenta = await Cuenta.findOne({clienteId:id});
    return cuenta;
}

//Funcion Crear Cuenta
async function crearCuenta(body){
    let cuenta = new Cuenta({
        clienteId : clienteId
    });
    return await cuenta.save();
}

//Funcion Actualizar Cuenta
async function actualizarCuenta(id,body){
    let cuenta = await Cuenta.findByIdAndUpdate(id,{
        $set:{
            saldo           : body.saldo,
            saldoCredito    : body.saldoCredito,
            saldoBloq       : body.saldoBloq,
            saldoElectronico: body.saldoElectronico,
            estado          : body.estado
        }
    },{new : true})
    return cuenta;
}

//Funcion Eliminar Cuenta
async function eliminarCuenta(id){
    let cuenta = await Cuenta.findByIdAndUpdate(id,{
        $set:{
            estado : 'E'
        }
    })
    return cuenta;
}

module.exports = ruta;