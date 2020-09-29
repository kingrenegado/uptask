const Proyectos = require('../models/Proyectos');

exports.proyectosHome = (req,res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    })
}
exports.formularioProyecto = (req,res) => {
    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto'});
}

exports.nuevoProyecto = (req,res) => {
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
        Proyectos.create({nombre})
                .then(() => console.log('Insertado correctamente'))
                .catch(error => console.log(error));
    }
}

