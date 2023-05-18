import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.config2.js';
import Comment from './comment.js';

const Reply = sequelize.define('Reply', {
  idReply: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  idCommentReply: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reply: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  myDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  // Define virtual properties
  getterMethods: {
    totalReplies() {
      return this.getComment().then(comment => comment.totalReplies);
    },
  },
});

Reply.associate = function(models) {
  Reply.belongsTo(models.Comment, {
    foreignKey: 'idCommentReply',
    targetKey: 'idComment',
  });
};

export default Reply;