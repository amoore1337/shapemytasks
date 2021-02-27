const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static getModelName() {
      return 'User';
    }

    static associate(models) {
      User.hasOne(models.Team, { foreignKey: 'createdById', as: 'ownsTeam', onDelete: 'SET NULL' });
      User.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team', onDelete: 'SET NULL' });
      User.hasMany(models.Project, {
        foreignKey: 'createdById',
        as: 'ownedProjects',
        onDelete: 'SET NULL',
      });
    }
  }

  User.graphAssociations = {
    ownsTeam: 'Team',
    team: 'Team',
  };

  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatarUrl: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
