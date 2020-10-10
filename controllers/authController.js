const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect:'/iniciar-sesion', 
    failureFlash: true,
    badRequestMessage: 'Todos los campos son obligatorios'
})