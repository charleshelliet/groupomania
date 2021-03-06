const mysql = require('mysql');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
  port: 3307,
  freezeTableName: true,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

  try {
    sequelize.authenticate();
    console.log('Charles Connecté à la base de données MySQL!');
  } catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
  }
  
module.exports = sequelize;