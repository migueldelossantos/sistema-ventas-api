//Req Auto
const express = require('express');
const bcrypt = require('bcrypt');

//Req Personales
const Usuario = require('../models/usuario_model');
const verificarToken = require('../config/middlewares/auth')

const ruta = express.Router();

//GET Usuarios
ruta.get('/',verificarToken,(req,res)=>{
    let resulado = listarUsuariosActivos()
    .select({nombre:1,email:1});
    resulado.then(usuarios=>{
        res.json(usuarios);
    }).catch(err=>{
        res.status(400).json({
            error : err
        });
    });
});

//POST Usuario
ruta.post('/',(req,res)=>{
    let body = req.body;
    let resultado = crearUsuario(body);

    //Validación de Email
    Usuario.findOne({email:body.email},(error,usuario)=>{
        if(error){
            return res.status(400).json({error:'Server Error'});
        }
        if(usuario){
            return res.status(400).json({
                message:'El Usuario ya existe.'
            });
        }
    });

    //Registro de Usuario
    resultado.then( usr => {
        res.json({
            usuario : usr
        })
    })
    .catch(err => {
        res.status(400).json({
            error : err
        })
    });
});

//PUT Usuario
ruta.put('/:id',(req,res) => {
    let resulado = actualizarUsuario(req.body.id, req.body);

    resulado.then(valor =>{
        res.json({
            usuario : valor
        });
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
});

//Funcion Listar Usuarios
async function listarUsuariosActivos(){
    let usuarios = await Usuario.find({'estado':'A'});
    return usuarios;
}

//Función solo para guardar elemento
async function crearUsuario(body){
    let usuario = new Usuario({
        email       : body.email,
        nombre      : body.nombre,
        password    : bcrypt.hashSync( body.password, 10)
    });
    // Método para guardar documento (objeto)
    return await usuario.save();
}

//Función Actualizar Usuario
async function actualizarUsuario(id,body){
    //Consulta Y Actualización Usuario
    //Dentro del operador $set se especifican los datos a actulizar
    let usuario = await Usuario.findByIdAndUpdate(id,{
        $set:{
            nombre:body.nombre,
            password:body.password
        }
    },{new:true});

    return usuario;
}

module.exports = ruta;