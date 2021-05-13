module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Scopes', 'position', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Scopes', 'position');
  },
};
