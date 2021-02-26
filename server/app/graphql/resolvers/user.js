const { basicQueryAllResolver, basicFindByIdResolver } = require('../helpers');
const { User } = require('../../models');

module.exports = {
  Query: {
    ...basicQueryAllResolver(User),
    ...basicFindByIdResolver(User),
  },

  User: {
    ownsTeam(user) {
      return user.getOwnsTeam();
    },
    team(user) {
      return user.getTeam();
    },
  },
};
