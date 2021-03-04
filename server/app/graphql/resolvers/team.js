const { basicQueryAllResolver, basicFindByIdResolver } = require('../helpers');
const { Team } = require('../../models');

module.exports = {
  Query: {
    ...basicQueryAllResolver(Team),
    ...basicFindByIdResolver(Team),
  },

  Team: {
    members(team) {
      return team.getMembers();
    },
  },
};
