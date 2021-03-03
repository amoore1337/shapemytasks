module.exports = {
  client: {
    includes: ['./src/**/*.tsx'],
    service: {
      name: 'shapemytasks',
      url: 'https://localhost/api/graphql',
      skipSSLValidation: true,
    },
  },
};
