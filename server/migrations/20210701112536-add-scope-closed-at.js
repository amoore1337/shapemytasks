module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Scopes', 'closedAt', {
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Scopes', 'closedAt');
  },
};
