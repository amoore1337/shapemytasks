module.exports = {
  Query: {
    currentUser: (_, __, { user }) => user,
  },
};
