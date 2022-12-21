const userService = require('../../services/user.service');
const teamService = require('../../services/team.service');
const { rejectUnauthenticated } = require('../helpers');
const { db } = require('../../db.ts');

module.exports = {
  Mutation: {
    async createTeam(_, { name, restrictEmailDomain }, { user }) {
      rejectUnauthenticated(user);

      await teamService.createTeam(name, restrictEmailDomain, user);
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
    async team(currentUser) {
      if (currentUser.teamId) {
        return db.teams.findUnique({ where: { id: currentUser.teamId } });
      }
      return null;
    },
  },
};
