/*const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'xipe',
    password : 'xp2022',
    database : 'xp_sisventas'
});

module.exports = db;*/
/*
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/xp_sisventas',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

module.exports = mongoose;*/
db = (
    'mongodb://localhost:27017/xp_sisventas',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

module.exports = db;