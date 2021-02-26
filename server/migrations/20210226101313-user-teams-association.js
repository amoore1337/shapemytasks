module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.renameColumn('Teams', 'createdBy', 'createdById', {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      });

      await queryInterface.addColumn('Users', 'teamId', {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Teams',
          },
          key: 'id',
        },
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.renameColumn('Teams', 'createdById', 'createdBy');
      await queryInterface.removeColumn('Users', 'teamId');
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
