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
                msg: 'Agrega un correo válido'
            },
            notEmpty:{
                msg:'El email no puede ir vacío'
            }
        },
        unique:{
            args:true,
            msg:'Usuario ya registrado'
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg:'El password no puede ir vacío'
            }
        }
    },
}, {
    hooks:{
        beforeCreate(usuario){
         usuario.password = bcrypt.hashSync(usuario.password,bcrypt.genSaltSync(10));
    }
}
});
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;