const sequelize = require('../database');
const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {}

User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'User',
  });

console.log(User === sequelize.models.User);

module.exports = User; 