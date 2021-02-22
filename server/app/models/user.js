const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
