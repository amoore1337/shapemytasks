module.exports = {
  Query: {
    heartbeat: (_, __, { user }) => ({ authenticated: !!user }),
  },
};
