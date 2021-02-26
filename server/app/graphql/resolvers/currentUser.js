module.exports = {
  Query: {
    currentUser: (_, __, { user }) => user,
  },

  CurrentUser: {
    team(currentUser) {
      return currentUser.getTeam();
    },
  },
};
