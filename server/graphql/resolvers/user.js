const { basicQueryAllResolver } = require('../helpers');
const { User } = require('../../app/models');

module.exports = {
  Query: {
    ...basicQueryAllResolver(User),
  },
};
