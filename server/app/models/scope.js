const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Scope extends Model {
    static getModelName() {
      return 'Scope';
    }

    static associate(models) {
      Scope.belongsTo(models.User, { foreignKey: 'createdById', as: 'createdBy', onDelete: 'SET NULL' });
      Scope.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project', onDelete: 'SET NULL' });
    }
  }

  Scope.graphAssociations = {
    createdBy: 'User',
    project: 'Project',
  };

  Scope.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    createdById: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#0277bd',
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Scope',
  });
  return Scope;
};
