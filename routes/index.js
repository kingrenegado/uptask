const router = require('express').Router();

//importar express-validator
const { body } = require('express-validator');


//importar controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
//rutas
module.exports = function(){
    router.get('/', authController.usuarioAutenticado ,proyectosController.proyectosHome);
    
    router.get('/nuevoProyecto', proyectosController.formularioProyecto)
    router.post('/nuevoProyecto', 
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto);


    //Listar Proyecto 
    router.get('/proyectos/:url', authController.usuarioAutenticado, proyectosController.proyectoPorUrl);

    //actualizar proyecto
    router.get('/proyecto/editar/:id' ,authController.usuarioAutenticado, proyectosController.formularioEditar);

    router.post('/nuevoProyecto/:id', 
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto);

    //eliminar Proyectos
    router.delete('/proyectos/:url',authController.usuarioAutenticado, proyectosController.eliminarProyecto);


    //tareas
    router.post('/proyectos/:url',authController.usuarioAutenticado, tareasController.agregarTarea);

    //Actualizar Tarea
    router.patch('/tareas/:id',authController.usuarioAutenticado, tareasController.cambiarEstadoTarea)

    //Eliminar Tarea
    router.delete('/tareas/:id',authController.usuarioAutenticado, tareasController.eliminarTarea);


    //Crear nueva cuenta

    router.get('/crear-cuenta',usuariosController.formCrearCuenta);

    router.post('/crear-cuenta',usuariosController.crearCuenta);

    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);;


    //cerrar sesion

    router.get('/cerrar-sesion', authController.cerrarsesion);

    //reestablecer contraseña
    router.get('/reestablecer', usuariosController.formRestablecerPassword);
    router.post('/reestablecer', authController.enviarToken);
    router.get('/reestablecer/:token',authController.resetPassword);

    router.post('/reestablecer/:token',authController.actualizarPassword);
    return router;
}