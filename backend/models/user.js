import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.config2.js';
import Comment from './comment.js';

const User = sequelize.define('User', {
  idUser: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  myDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  tag_posts: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

User.associate = function(models){
  User.hasMany(models.Comment, {
    foreignKey: 'idUserComment',
    sourceKey: 'idUser',
    onDelete: 'cascade'
  });
};

export default User;