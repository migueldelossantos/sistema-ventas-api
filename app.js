const express = require('express');
const morgan = require('morgan'); //Registros de logs de peticiones
const mongoose = require('mongoose');
const config = require('config'); // export NODE_ENV=development

//Requiere personalizados
const usuarios = require('./routers/usuarios');
const auth = require('./routers/auth');

//DB
mongoose.connect(
        config.get('configDB.Host'),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('Conectado a MongoDB'))
        .catch(err=>console.log('No se pudo correctar a MongoDB ',err));

const app = express();

app.use(express.json()); // body
app.use(express.urlencoded()); // Decodificaión de datos por url

//Rutas personalizadas
app.use("/api/usuarios",usuarios);
app.usr("/api/login",auth);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`);
});