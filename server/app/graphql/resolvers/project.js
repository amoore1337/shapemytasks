const { rejectUnauthenticated } = require('../helpers');
const projectService = require('../../services/project.service');

module.exports = {
  Mutation: {
    createProject(_, { title, description, visibility }, { user }) {
      rejectUnauthenticated(user);

      return projectService.createProject(title, description, visibility, user);
    },

    updateProject(_, { id, ...updateValues }, { user }) {
      rejectUnauthenticated(user);

      return projectService.updateProject(id, user, updateValues);
    },

    deleteProjectById(_, { id }, { user }) {
      rejectUnauthenticated(user);

      return projectService.deleteProject(id, user);
    },
  },

  Query: {
    projects(_, __, { user }) {
      return projectService.findAllProjectsForUser(user);
    },

    project(_, { id }, { user }) {
      return projectService.findProjectForUser(id, user);
    },
  },

  Project: {
    team(project) {
      return project.getTeam();
    },

    owner(project) {
      return project.getOwner();
    },

    scopes(project) {
      return project.getScopes({ order: [['id', 'ASC']] });
    },
  },
};
