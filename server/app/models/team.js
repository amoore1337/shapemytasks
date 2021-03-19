const { Model } = require('sequelize');
const { base26EncodeNum, randomStringGenerator } = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static getModelName() {
      return 'Team';
    }

    static associate(models) {
      Team.belongsTo(models.User, { foreignKey: 'createdById', as: 'owner', onDelete: 'SET NULL' });
      Team.hasMany(models.User, { foreignKey: 'teamId', as: 'members', onDelete: 'SET NULL' });
      Team.hasMany(models.Project, { foreignKey: 'teamId', as: 'allProjects', onDelete: 'SET NULL' });
      Team.hasMany(models.Project, {
        scope: { visibility: 'visible' },
        foreignKey: 'teamId',
        as: 'visibleProjects',
        onDelete: 'SET NULL',
      });
    }
  }

  Team.graphAssociations = {
    members: '[User]',
    // metrics: 'TeamMetrics',
  };

  Team.init({
    name: DataTypes.STRING,
    createdById: DataTypes.INTEGER,
    joinCode: DataTypes.STRING,
    restrictEmailDomain: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Team',
    hooks: {
      afterCreate: async (team) => {
        team.joinCode = `${base26EncodeNum(team.id)}-${randomStringGenerator(4)}`;
        await team.save();
      },
    },
  });
  return Team;
};
