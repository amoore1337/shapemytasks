const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Scope extends Model {
    static getModelName() {
      return 'Scope';
    }

    static associate(models) {
      Scope.belongsTo(models.User, { foreignKey: 'createdById', as: 'createdBy', onDelete: 'SET NULL' });
      Scope.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project', onDelete: 'CASCADE' });
      Scope.hasOne(models.Flag, { foreignKey: 'scopeId', as: 'flag', onDelete: 'SET NULL' });
    }

    async isFlagged() {
      return !!this.getFlag();
    }
  }

  Scope.graphAssociations = {
    createdBy: 'User',
    project: 'Project',
    flag: 'Flag',
  };

  Scope.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    createdById: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    position: DataTypes.STRING,
    closedAt: DataTypes.DATE,
    niceToHave: DataTypes.BOOLEAN,
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#0277bd',
    },
    progress: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Scope',
  });
  return Scope;
};
