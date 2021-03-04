const userService = require('../../services/user.service');
const teamService = require('../../services/team.service');
const { rejectUnauthenticated } = require('../helpers');

module.exports = {
  Mutation: {
    async createTeam(_, { name }, { user }) {
      rejectUnauthenticated(user);

      await teamService.createTeam(name, user);
      return user.reload();
    },

    async joinTeam(_, { joinCode }, { user }) {
      rejectUnauthenticated(user);

      await userService.joinTeam(user, joinCode);
      return user.reload();
    },
  },

  Query: {
    currentUser: (_, __, { user }) => user,
  },

  CurrentUser: {
    team(currentUser) {
      return currentUser.getTeam();
    },
  },
};
