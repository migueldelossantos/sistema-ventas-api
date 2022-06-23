const express = require('express');

const Categoria = require('../models/categoria_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get Categorias
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = listarCategorias();

    resultado.then(categorias=>{
        res.json(categorias);
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
});

//GEt By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getCategoria(req.body.id);
    resultado.then(cat=>{
        res.json({
            categoria : cat
        }).catch(err=>{
            res.status(400).json({
                error : er
            })
        })
    })
});

//POST Categoria
ruta.post('/',verificarToken,(req,res)=>{
    let body = res.body;
    let resultado = crearCategoria(body);

    resultado.then(cat=>{
        res.json(cat);
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
});

//PUT Categoria
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarCategoria(req.body.id,req.body);

    resultado.then(cat=>{
        res.json({
            categoria : cat
        }).catch(err =>{
            res.status(400).json({
                error : err
            });
        })
    })
});

//DELETE Categoria
ruta.delete('/:id',verificarToken,(req,res)=>{
    let resultado = elimiarCategoria(req.body.id);

    resultado.then(cat=>{
        res.json({
            categoria : cat
        }).catch(err=>{
            res.status(400).json({
                erros : err
            })
        });
    })
});

// Función Listar Categorias
async function listarCategorias(){
    let categorias = await Categoria.find({});
    return categorias;
}

//Funcion Obtener By Id
async function getCategoria(id){
    let categoria = await Categoria.findById(id);
    return categoria;
}

//Funcion Guardar Categoria
async function crearCategoria(body){
    let categoria = new Categoria({
        nombre      : body.nombre,
        descripcion : body.descripcion,
        clave       : body.clave    
    });
    return await categoria.save();
}

//Funcion Actualizar 
async function actualizarCategoria(id,body){
    let categoria = await Categoria.findByIdAndUpdate(id,{
        $set:{
            nombre      : body.nombre,
            descripcion : body.descripcion,
            clave       : body.clave
        }
    });
    return categoria;
}

//Funcion Delete
async function elimiarCategoria(id){
    let categoria = await Categoria.deleteOne(id);
    return categoria;
}

module.exports = ruta;