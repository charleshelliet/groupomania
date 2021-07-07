'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize();

  class User extends Model {}

  User.init({
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
      allowNull: true,
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