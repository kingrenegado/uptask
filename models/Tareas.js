const Sequelize = require('sequelize');
const db = require('../config/db');

const Tareas = db.define('tareas', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tarea: {
        type: Sequelize.String
    },
    estado:{
        type: Sequelize.INTEGER
    }
});


module.exports = Tareas;