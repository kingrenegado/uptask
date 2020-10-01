const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyparser = require('body-parser');
const helpers = require('./helpers');
//conexion a bd
const db = require('./config/db');

//importar modelo
require('./models/Proyectos');

db.sync()
    .then(() => console.log('Conectado a BD'))
    .catch(error => console.log(error));

//crear una app de express
const app = express();

//donde cargar archivos estaticos
app.use(express.static('public'));

//habilitar pug
app.set('view engine', 'pug');

//añadir carpeta de vistas
app.set('views' , path.join(__dirname, './views'));


//Pasar Vardump a la app
app.use((req,res,next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    res.locals.vardump = helpers.vardump;
    next();
})

app.use((req,res,next) => {
    console.log('Yo soy middleware');
    next();
})


//habilitar bodyparser
app.use(bodyparser.urlencoded({extended:true}));

app.use('/', routes());






//Puerto
const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`Escuchado en puerto ${port}`);
})