const { Sequelize } = require('sequelize');

const db = new Sequelize('uptasknode', 'root', '1234', {
  host: '127.0.0.1',
  dialect:  'mysql',
  port: '3307',
  define:{
      timestamps: false
  },

  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  },
});

module.exports = db;