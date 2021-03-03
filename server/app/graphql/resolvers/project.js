const { basicFindByIdResolver, rejectUnauthenticated } = require('../helpers');
const projectService = require('../../services/project.service');
const { Project } = require('../../models');

module.exports = {
  Mutation: {
    createProject(_, { title, description, visibility }, { user }) {
      rejectUnauthenticated(user);

      return projectService.createProject(title, description, visibility, user);
    },

    deleteProjectById(_, { id }, { user }) {
      rejectUnauthenticated(user);

      return projectService.deleteProject(id, user);
    },
  },

  Query: {
    ...basicFindByIdResolver(Project),

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
  },
};
