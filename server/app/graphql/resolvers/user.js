const { basicQueryAllResolver, basicFindByIdResolver } = require('../helpers');
const { User } = require('../../models');
const { findAllAuthorizedProjectsForUser } = require('../../services/projectM.ts');
const { db } = require('../../db.ts');

module.exports = {
  Query: {
    ...basicQueryAllResolver(User),
    ...basicFindByIdResolver(User),
  },

  User: {
    async team(currentUser) {
      if (currentUser.teamId) {
        return db.teams.findUnique({ where: { id: currentUser.teamId } });
      }
      return null;
    },
    projects(_, __, { user }) {
      return findAllAuthorizedProjectsForUser(user);
    },
  },
};
