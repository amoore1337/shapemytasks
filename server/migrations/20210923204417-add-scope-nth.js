module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Scopes', 'niceToHave', {
      type: Sequelize.BOOLEAN,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Scopes', 'niceToHave');
  },
};
