const Proyectos = require('../models/Proyectos');
const slug = require('slug');
const Tareas = require('../models/Tareas');

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
        await Proyectos.create({nombre});
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


    //consultar tareas proyecto actual
    const tareas = await Tareas.findAll({
        where: {
             proyectoId: proyecto.id
        },
        include: [
            {model: Proyectos}
        ]
    });


    if(!proyecto) res.redirect('/');

    res.render('tareas',{
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
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


exports.actualizarProyecto = async(req, res) => {
    const { nombre } = req.body; // Nombre que viene en el INPUT formulario
    const idUrl = req.params.id; // Valor que ID que viene en URL
 
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: idUrl
        }
    });
 
    const [proyectos, proyecto] = await Promise.all([
        proyectosPromise, proyectoPromise
    ]);
 
    let errores = [];
 
    const { url } = proyecto; // Utilizado para el redirect
 
    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al proyecto' });
    }
 
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            titulo: 'Actualizar proyecto',
            errores,
            proyecto,
            proyectos
        });
    } else {
        await Proyectos.update({ nombre: nombre }, { where: { id: idUrl } });
        res.redirect(`/proyectos/${url}`);
    }
}

exports.eliminarProyecto = async (req,res,next) => {
    // console.log(req.query);
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({
        where: {
            url : urlProyecto
        }
    });

    if(!resultado){
        return next;
    }

    res.send('Proyecto Eliminado Correctamente')
}