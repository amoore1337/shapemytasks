const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Flag extends Model {
    static getModelName() {
      return 'Flag';
    }

    static associate(models) {
      Flag.belongsTo(models.User, {
        foreignKey: 'createdById',
        as: 'createdBy',
        onDelete: 'SET NULL',
      });
      Flag.belongsTo(models.Scope, { foreignKey: 'scopeId', as: 'scope', onDelete: 'CASCADE' });
    }
  }

  Flag.graphAssociations = {
    createdBy: 'User',
    scope: 'Scope',
  };

  Flag.init(
    {
      message: DataTypes.STRING,
      createdById: DataTypes.INTEGER,
      scopeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Flag',
    }
  );
  return Flag;
};
