const { basicFindByIdResolver } = require('../helpers');
const { Team } = require('../../models');

module.exports = {
  Query: {
    ...basicFindByIdResolver(Team),
  },

  Team: {
    members(team) {
      return team.getMembers();
    },
  },
};
