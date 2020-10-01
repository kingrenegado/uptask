const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectosHome = async(req,res) => {
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    })
}
exports.formularioProyecto = async(req,res) => {
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto',
    proyectos
});
}

exports.nuevoProyecto = async (req,res) => {
    //Enviar a la consola lo que el usuario escriba
    //console.log(req.body);

    //validar que venga algo en el input
    const {nombre} = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agrega el nombre del Proyecto'});
    }

    //si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    }else{
        //no hay errores insertar bd
       // const url = slug(nombre).toLowerCase();
        //const proyecto = await Proyectos.create({nombre,url});
        const proyecto = await Proyectos.create({nombre});
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req,res,next) => {
    const proyectosPromise =  Proyectos.findAll();
    const proyectoPromise =  Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });
    
    const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);

    if(!proyecto) res.redirect('/');

    res.render('tareas',{
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}

//actualizar proyecto

exports.formularioEditar = async (req,res) => {
    const proyectosPromise =  Proyectos.findAll();
    const proyectoPromise =  Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);
    const id = req.params.id;
    res.render('nuevoProyecto',{
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}