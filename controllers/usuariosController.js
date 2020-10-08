const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = async (req,res) =>{
    res.render('crearCuenta',{
        nombrePagina: 'Crear Cuenta en uptask'
    })
};

exports.crearCuenta = async (req,res) => {
    //leer datos
    const {email,password} = req.body;

    try{
        //crear usuario
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion');
    }catch(error){
        console.log(error);
        res.render('crearCuenta',{
            errores:error.errors,
            nombrePagina: 'Crear Cuenta en uptask'
        })
    }

}