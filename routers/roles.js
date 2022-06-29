const express = require('express');

const Rol = require('../models/rol_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//GET
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = listarRoles();
    resultado.then(roles=>{
        res.json(roles);
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
});

// GET by Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getRol(req.body.id);
    resultado.then(rol=>{
        res.json(rol);
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    })
});

// POST Crear
ruta.post('/',(req,res)=>{
    let resultado = crearRol(req.body);

    resultado.then(rol=>{
        res.json({
            rol : rol
        });
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
});

// Funcion Obtener Usuarios
async function listarRoles(){
    let roles = await Rol.find();
    return roles;
}

// Funcion Obtener Rol poy Id
async function getRol(id){
    let rol = await Rol.findById(id);
    return rol;
}

//Función Crear Rol
async function crearRol(body){
    let rol = new Rol({
        nombre: body.nombre,
        descripcion : body.desc,
        clave : body.clave
    });

    return await rol.save();
}

module.exports = ruta;