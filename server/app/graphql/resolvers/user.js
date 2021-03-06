const { basicQueryAllResolver, basicFindByIdResolver } = require('../helpers');
const { User } = require('../../models');
const projectService = require('../../services/project.service');

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
    projects(_, __, { user }) {
      return projectService.findAllProjectsForUser(user);
    },
  },
};
