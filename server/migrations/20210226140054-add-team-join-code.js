module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Teams', 'joinCode', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Teams', 'joinCode');
  },
};
