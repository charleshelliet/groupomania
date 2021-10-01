const sequelize = require('../database');
const { Sequelize, DataTypes, Model } = require('sequelize');
const Message = require("../models/message");
const User = require("../models/user");

class Comment extends Model {}

Comment.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    messageId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Message',
          key: 'id'
        }
      },  
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
    content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comment',
  });


User.belongsToMany(Message, {
  through: Comment,
  foreignKey: 'userId',
  otherKey: 'messageId',
});
Message.belongsToMany(User, {
  through: Comment,
  foreignKey: 'messageId',
  otherKey: 'userId',
});
Comment.belongsTo(Message);
Comment.belongsTo(User);

console.log(Comment === sequelize.models.Comment);

module.exports = Comment; 