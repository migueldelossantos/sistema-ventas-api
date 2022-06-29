const express = require('express');

const Cliente = require('../models/cliente_model');
const verificarToken = require('../middlewares');

const ruta = express.Router();

//Get Clientes
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = listarClientesActivos();
    resultado.then(clis=>{
        res.json({
            clientes : clis
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
});

//GET By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getCliente(req.params.id);
    resultado.then(cli=>{
        res.json({
            cliente : cli
        }).catch(err=>{
            res.status(400).json({
                error : err
            })
        })
    })
});

//GET By Nonbre
ruta.get('/nombre/:nombre',verificarToken,(req,res)=>{
    let resultado = listarClientesByNombre(req.params.nombre);
    resultado.then(cli=>{
        res.json({
            cliente : cli
        }).catch(err=>{
            res.status(400).json({
                error : err
            })
        })
    })
})

//POST Cliente
ruta.post('/',verificarToken,(req,res)=>{
    let body = req.body;
    let resultado = crearCliente(body);

    resultado.then(cli=>{
        res.json({
            cliente : cli
        }).catch(err =>{
            res.status(400).json({
                error : err
            })
        })
    })
});

//PUT Cliente
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actulizarCliente(req.body.id,req.body);
    resultado.then(cli=>{
        res.json({
            cliente : cli
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    })
});

// DELETE
ruta.delete('/:id',verificarToken,(req,res)=>{
    let resultado = eliminarCliente(req.body.id);

    resultado.then(cli=>{
        res.json({
            cliente : cli
        }).catch(err=>{
            res.status(400).json({
                error:err
            })
        })
    })
})

//Funcion Listar Clientes
async function listarClientesActivos(){
    let clientes = await Cliente.find({'estado':'A'});
    return clientes;
}

//Funcion Get By Id
async function getCliente(id){
    let cliente = await Cliente.findById(id);
    return cliente;
}

//Funcion Get Clientes By Nombre
async function listarClientesByNombre(nombre){
    let clientes = await Cliente.find({ 
        nombreCompleto: {
            $regex : '.*'+nombre+',*',
            $options : "$i"
        }
    });
    return clientes;
}

//Funcion Crear Cliente
async function crearCliente(body){
    let cliente = new Cliente({
        nombre      : body.nombre,
        apellidoPat : body.apellidoPat,
        apellidoMat : body.apellidoMat,
        nombreCompleto : body.nombre + body.apellidoPat + apellidoMat,
        RFC         : body.RFC,
        telFijo     : body.telFijo,
        celular     : body.Celular,
        email       : body.email
    });
    return await cliente.save();
}

//Funcion Actualizar cliente
async function actulizarCliente(id,body){
    let cliente = await Cliente.findByIdAndUpdate(id,{
        nombre      : body.nombre,
        apellidoPat : body.apellidoPat,
        apellidoMat : body.apellidoMat,
        nombreCompleto : body.nombre + body.apellidoPat + apellidoMat,
        RFC         : body.RFC,
        telFijo     : body.telFijo,
        celular     : body.Celular,
        email       : body.email,
        estado      :  body.estado
    });
    return cliente;
}

//Funcion Eliminar Cliente
async function eliminarCliente(id){
    let cliente = await Cliente.findByIdAndUpdate(id,{
        $set:{
            estado : 'E'
        }
    },{new:true});
    return cliente;
}

module.exports = ruta;