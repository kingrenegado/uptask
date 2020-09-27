const router = require('express').Router();

//importar controlador
const proyectosController = require('../controllers/proyectosController');

//rutas
module.exports = function(){
    router.get('/', proyectosController.proyectosHome);
    
    

    return router;
}