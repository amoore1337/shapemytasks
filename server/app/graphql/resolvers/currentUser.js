const userService = require('../../services/user.service');

module.exports = {
  Mutation: {
    joinTeam: (_, { joinCode }, { user }) => userService.joinTeam(user, joinCode),
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
