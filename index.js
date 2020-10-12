const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyparser = require('body-parser');
const helpers = require('./helpers');
const flash = require('connect-flash');
const sesion = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

//conexion a bd
const db = require('./config/db');

//importar modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado a BD'))
    .catch(error => console.log(error));



//crear una app de express
const app = express();

//habilitar bodyparser
app.use(bodyparser.urlencoded({extended:true}));


//donde cargar archivos estaticos
app.use(express.static('public'));

//habilitar pug
app.set('view engine', 'pug');

//añadir carpeta de vistas
app.set('views' , path.join(__dirname, './views'));

//agregar mensajes flash
app.use(flash());

//sesiones que permiten navegar entre paginas sin tener que autenticarte
app.use(sesion({
    secret: 'supersecreto',
    resave: false,
    saveUnitialized: false
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());


//Pasar Vardump a la app
app.use((req,res,next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
})


app.use('/', routes());

//Puerto
const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`Escuchado en puerto ${port}`);
});


require('./handlers/email');