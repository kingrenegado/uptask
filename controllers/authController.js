const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto')

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect:'/iniciar-sesion', 
    failureFlash: true,
    badRequestMessage: 'Todos los campos son obligatorios'
});


//funcion para revisar si está logeado o no

exports.usuarioAutenticado = (req,res,next) => {

    //si está autenticado

    if(req.isAuthenticated()){
        return next();
    }
    //si no está autenticado
    return res.redirect('/iniciar-sesion');
}


//funcion cerrar sesiones
exports.cerrarsesion = async (req,res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');//al cerrar sesion lleva a login
    })
}

exports.enviarToken = async (req, res) => {
    //verificamos q existe el usuario antes
    const {email} = req.body;
    const usuario = await Usuarios.findOne({where: {email}});
    
    if(!usuario){
       req.flash('error', 'No existe esa cuenta');
       res.redirect('./reestablecer');
    
       }
    //Si usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;
    
    //guardarlos en la base de datos
    await usuario.save();
    
    //url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    
    console.log(resetUrl);
    console.log('Saliendo de enviar token');
   }
    
exports.resetPassword = async (req, res) => {
    res.json(req.params.token);
}