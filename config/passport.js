const passport = require('passport');
const LocalStrategy = require('passport-local');

// Referencia a Modelo donde se autenticarte
const Usuarios = require('../models/Usuarios');

//Local strategy -login con credenciales propias
passport.use(
    new LocalStrategy(
        //por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email,password,done) => {
            try{
                const usuario = await Usuarios.findOne({
                    where: {
                        email:email
                    }
                });
                //el usuario existe, password incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null,false,{
                        message : 'Password Incorrecto'
                    })
                }
                //el email existe y password Incorrecto
                return done(null,usuario)
            }catch(error){
                //Ese usuario no existe
                return done(null,false,{
                    message : 'Esa cuenta no existe'
                })
            }
        }
    )
)

//serializar cuenta
passport.serializeUser((usuario,callback) => {
    callback(null,usuario);
})

//deserializar cuenta
passport.deserializeUser((usuario,callback) => {
    callback(null,usuario)
});


//exportar
module.exports = passport