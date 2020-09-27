const express = require('express');
const routes = require('./routes');
const path = require('path');
//crear una app de express
const app = express();

//donde cargar archivos estaticos
app.use(express.static('public'));

//habilitar pug
app.set('view engine', 'pug');

//añadir carpeta de vistas
app.set('views' , path.join(__dirname, './views'));

app.use('/', routes());






//Puerto
const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`Escuchado en puerto ${port}`);
})