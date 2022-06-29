const express = require('express');

const Producto = require('../models/producto_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getProductoById(req.params.id);
    resultado.then(produc=>{
        res.json({
            producto : produc
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
})

//Get By CodigoBarras
ruta.get('/codigo/:codigoBarra',verificarToken,(req,res)=>{
    let resultado = getProductoByCodigo(req.params.codigoBarra);
    resultado.then(produc=>{
        res.json({
            producto : produc
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Get By Nombre
ruta.get('/nombre/:nombre',verificarToken,(req,res)=>{
    let resultado = getProductoByNombre(req.params.nombre);
    resultado.then(producs=>{
        res.json({
            productos : producs
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//POST
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearProducto(req.body);
    resultado.then(produc=>{
        res.json({
            producto : produc
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarProducto(req.params.id,req.body);
    resultado.then(produc=>{
        res.json({
            producto : produc
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    });
})

//Funcion Get By Id
async function getProductoById(id){
    let producto = await Producto.findById(id);
    return producto;
}

//Funcion Get By CodigoBarra
async function getProductoByCodigo(codigoBarra){
    let producto = await Producto.findOne({
        codigoBarras : codigoBarra
    });
    return producto;
}

async function getProductoByNombre(nombre){
    let producto = await Producto.find({
        nombre : {
            $regex : '.*'+nombre+'.*',
            $options : "$i"
        }
    });
    return producto;
}

//Funcion Crear
async function crearProducto(body){
    let producto = new Producto({
        codigoBarras    : body.codigoBarras,
        nombre          : body.nombre,
        nombreCorto     : body.nombreCorto,
        precioCompra    : body.precioCompra,
        precioVenta     : body.precioVenta,
        tipoGanancia    : body.tipoGanancia,
        ganancia        : body.ganancia,
        stock           : body.stock,
        stockMin        : body.stockMin,
        unidadMedida    : body.unidadMedida,
        iva             : body.iva,
        ieps            : body.ieps,
        imgPrincipl     : body.imgPrincipl,
        subCategoria    : body.subCategoria
    });
    return await producto.save();
}

//Funcion Actualizar
async function actualizarProducto(id,body){
    let producto = await Producto.findByIdAndUpdate(id,{
        $set:{
            codigoBarras    : body.codigoBarras,
            nombre          : body.nombre,
            nombreCorto     : body.nombreCorto,
            precioCompra    : body.precioCompra,
            precioVenta     : body.precioVenta,
            tipoGanancia    : body.tipoGanancia,
            ganancia        : body.ganancia,
            stock           : body.stock,
            stockMin        : body.stockMin,
            unidadMedida    : body.unidadMedida,
            iva             : body.iva,
            ieps            : body.ieps,
            imgPrincipl     : body.imgPrincipl,
            subCategoria    : body.subCategoria,
            estado          : body.estado
        }
    });
    return producto;
}

module.exports = ruta;