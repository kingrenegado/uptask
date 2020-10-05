const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req,res,next) => {
    //obtener proyecto actual
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })
    
    //leer el valor del input
    const {tarea} = req.body;

    //estado 0 incompleto y ID proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertar en bd
    const resultado = await Tareas.create({tarea,estado,proyectoId});

    //redireccionar
    if(!resultado){
        return next;
    }

    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req,res) => {
    const {id} = req.params;
    const tarea = await Tareas.findOne({
        where:{
            id:id
        }
    })
    
    let estado = 0;
    if(tarea.estado === estado){
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).json({
        ok:true,
        mensaje:'Actualizado...'
    })
}