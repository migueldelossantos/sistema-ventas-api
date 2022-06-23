const express = require('express');

const SubCategoria = require('../models/subCategoria_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getSubCategoriaById(req.body.id);
    resultado.then(subCat=>{
        res.json({
            subCategoria : subCat
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Get By CategoriaId
ruta.get('/categoria/:id',verificarToken,(req,res)=>{
    let resultado = getSubCatByCategoriId(req.body.id);
    resultado.then(subCats=>{
        res.json({
            subCategorias : subCats
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearSubCategoria(req.body);
    resultado.then(subCat=>{
        res.json({
            subCategoria : subCat
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//PUT
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarSubCategoria(req.body.id,req.body);
    resultado.then(subCat=>{
        res.json({
            subCategoria : subCat
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Funcion Get By Id
async function getSubCategoriaById(id){
    let subCat = await SubCategoria.findById(id);
    return subCat;
}

//Funcino Get By Categoria Id
async function getSubCatByCategoriId(id){
    let subCats = await SubCategoria.find({
        categoriaId : id
    });
    return subCats;
}

//Funcion Crear
async function crearSubCategoria(body){
    let subCat = new SubCategoria({
        nombre      : body.nombre,
        descripcion : body.descripcion,
        clave       : body.clave,
        categoriaId : body.categoriaId
    });
    return await subCat.save();
}

//Funcion Actualizar
async function actualizarSubCategoria(id,body){
    let subCat = await SubCategoria.findByIdAndUpdate(id,{
        $set:{
            nombre      : body.nombre,
            descripcion : body.descripcion,
            clave       : body.clave,
            categoriaId : body.categoriaId
        }
    },{new:true});
    return subCat;
}

module.exports = ruta;