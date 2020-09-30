const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectosHome = async(req,res) => {
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    })
}
exports.formularioProyecto = (req,res) => {
    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto'});
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

