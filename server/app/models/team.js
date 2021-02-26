const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static getModelName() {
      return 'Team';
    }

    static associate(models) {
      Team.belongsTo(models.User, { foreignKey: 'createdById', as: 'owner', onDelete: 'SET NULL' });
      Team.hasMany(models.User, { foreignKey: 'teamId', as: 'members', onDelete: 'SET NULL' });
    }
  }

  Team.graphAssociations = {
    members: '[User]',
  };

  Team.init({
    name: DataTypes.STRING,
    createdById: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
