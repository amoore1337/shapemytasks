const { basicQueryAllResolver } = require('../helpers');
const { User } = require('../../models');

module.exports = {
  Query: {
    ...basicQueryAllResolver(User),
  },
};