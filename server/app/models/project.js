const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static getModelName() {
      return 'Project';
    }

    static associate(models) {
      Project.belongsTo(models.User, { foreignKey: 'createdById', as: 'owner', onDelete: 'SET NULL' });
      Project.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team', onDelete: 'SET NULL' });
    }
  }

  Project.graphAssociations = {
    owner: 'User',
    team: 'Team',
  };

  Project.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    createdById: DataTypes.INTEGER,
    visibility: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};
