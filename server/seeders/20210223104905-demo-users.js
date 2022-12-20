module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'example@example.com',
        avatarUrl: 'https://google.com/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Doe',
        email: 'example1@example.com',
        avatarUrl: 'https://google.com/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
