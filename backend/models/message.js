const sequelize = require('../database');
const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require("../models/user");

class Message extends Model {}

Message.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    attachment: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    likes: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'message',
  });

Message.belongsTo(User);

console.log(Message === sequelize.models.Message);

module.exports = Message; 