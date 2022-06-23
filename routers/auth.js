//Req Auto
const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

//Req Personales
const Usuario = require('../models/usuario_model');

const ruta = express.Router();

ruta.post('/', (req,res)=>{
    console.log('req.body.email :>> ', req.body.email);
    Usuario.findOne({email : req.body.email})
        .then(data=>{
            if(data){
                let passwordValidate = bcrypt.compareSync(req.body.password, data.password);
                if(!passwordValidate) return res.status(400).json({error:'ok',message:'Usuario o contaseña incorrecta.'})

                //token
                let jwtoken = jsonwebtoken.sign({
                        usuario : {_id:data._id, nombre:data.nombre,email:data.email}
                    },
                    config.get('configToken.SEED'),
                    {
                        expiresIn : config.get('configToken.expiration')
                    });

                // Respuesta de Datos de Usuario y Token
                res.json({
                    usuario : {
                        data
                    },
                    jwtoken
                });
            }else{
                res.status(400).json({
                    error : 'ok',
                    message : 'Usuario o contaseña incorrecta.'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                error : 'ok',
                message : 'Server Error.' + err
            })
        });
});


module.exports = ruta;