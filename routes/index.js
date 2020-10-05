const router = require('express').Router();

//importar express-validator
const { body } = require('express-validator');


//importar controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
//rutas
module.exports = function(){
    router.get('/', proyectosController.proyectosHome);
    
    router.get('/nuevoProyecto', proyectosController.formularioProyecto)
    router.post('/nuevoProyecto', 
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto);


    //Listar Proyecto 
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    //actualizar proyecto
    router.get('/proyecto/editar/:id' , proyectosController.formularioEditar);

    router.post('/nuevoProyecto/:id', 
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto);

    //eliminar Proyectos
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);


    //tareas
    router.post('/proyectos/:url', tareasController.agregarTarea);

    //Actualizar Tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea)
    return router;
}