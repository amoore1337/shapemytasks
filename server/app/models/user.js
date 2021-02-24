const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatarUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
