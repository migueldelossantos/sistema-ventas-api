const jwt = require('jsonwebtoken');
const config = require('config');

let verificarToken = (res, req, next)=>{
    let token = req.get('Autorization');
    jwt.verify(token,config.get('configToken.SEED'),(err,decoded)=>{
        if(err){
            return res.status(400).json({
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
}

module.exports = verificarToken;