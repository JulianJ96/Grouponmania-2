import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config2.js';
import Reply from './reply.js';

const Comment = sequelize.define(
  'Comment',
  {
    idComment: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    idUserComment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    myDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    // Define virtual properties
    getterMethods: {
      totalReplies() {
        return Reply.count({ where: { idCommentReply: this.idComment } });
      },
    },
  }
);

Comment.associate = function (models) {
  Comment.belongsTo(models.User, {
    foreignKey: 'idUserComment',
    targetKey: 'idUser',
  });
  Comment.hasMany(models.Reply, {
    foreignKey: 'idCommentReply',
    sourceKey: 'idComment',
  });
};

export default Comment;