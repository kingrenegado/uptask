const Sequelize  = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                message: 'Agrega un correo válido'
            },
            notEmpty:{
                message:'El email no puede ir vacío'
            }
        },
        unique:{
            args:true,
            message:'Usuario ya registrado'
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                message:'El password no puede ir vacío'
            }
        }
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
}, {
    hooks:{
        beforeCreate(usuario){
         usuario.password = bcrypt.hashSync(usuario.password,bcrypt.genSaltSync(10));
    }
}
});

//Metodos Personalisados
Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;