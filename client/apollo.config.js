module.exports = {
  client: {
    includes: ['./src/**/*.tsx', './src/**/*.ts'],
    excludes: ['./src/utils/cache.ts'],
    service: {
      name: 'shapemytasks',
      url: 'https://localhost/api/graphql',
      skipSSLValidation: true,
    },
  },
};
